"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type AuditFormState = {
  success?: boolean;
  error?: string;
};

export async function submitAuditAction(
  prevState: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const website = formData.get("website") as string;
  const bottleneck = formData.get("bottleneck") as string;
  const goal = formData.get("goal") as string;

  // Basic validation
  if (!firstName || !website) {
    return { error: "First Name and Website URL are required." };
  }

  const formattedUrl = website.startsWith("http")
    ? website
    : `https://${website}`;

  try {
    // Run Resend and Discord requests in parallel
    await Promise.all([
      // 1. Send Confirmation Email via Resend
      resend.emails.send({
        from: process.env.SENDER_EMAIL || "Audit <onboarding@resend.dev>",
        to: process.env.MY_NOTIFICATION_EMAIL || "your-email@domain.com",
        subject: `[Audit Request] ${firstName} - ${formattedUrl}`,
        html: `
          <h2>New Audit Ticket Received</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Website:</strong> <a href="${formattedUrl}">${formattedUrl}</a></p>
          <p><strong>Primary Bottleneck:</strong> ${bottleneck || "Not specified"}</p>
          <p><strong>6-Month Objective:</strong> ${goal || "Not specified"}</p>
        `,
      }),

      // 2. Push Rich Embed Notification to Discord Webhook
      fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "System Diagnostics",
          avatar_url: "https://i.imgur.com/8N7J2lG.png", // Optional bot icon
          embeds: [
            {
              title: "🚨 New Audit Ticket Initiated",
              color: 0xb4622a, // Matches #B4622A accent color
              fields: [
                {
                  name: "👤 Client",
                  value: `${firstName} ${lastName}`.trim(),
                  inline: true,
                },
                {
                  name: "🌐 Website",
                  value: `[${formattedUrl}](${formattedUrl})`,
                  inline: true,
                },
                {
                  name: "⚠️ Primary Bottleneck",
                  value: bottleneck || "*None selected*",
                  inline: false,
                },
                {
                  name: "🎯 6-Month Objective",
                  value: goal || "*None selected*",
                  inline: false,
                },
              ],
              footer: {
                text: "REF // 099-A • Est. Response: 24-48h",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      }),
    ]);

    return { success: true };
  } catch (err) {
    console.error("Submission error:", err);
    return { error: "Failed to submit request. Please try again." };
  }
}

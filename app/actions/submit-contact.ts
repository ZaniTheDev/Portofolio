"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success?: boolean;
  error?: string;
};

export async function submitContactAction(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const details = formData.get("details") as string;

  if (!name || !email) {
    return { error: "Name and Email are required." };
  }

  try {
    // 1. Safely pull and clean the env variable
    const rawSender = process.env.SENDER_EMAIL || "onboarding@resend.dev";
    const cleanSender = rawSender.replace(/['"<>]/g, "").trim();

    // 2. Dynamically format based on whether you are using the free tier or a custom domain
    const fromFormatted =
      cleanSender === "onboarding@resend.dev"
        ? "onboarding@resend.dev"
        : `Zani Studio <${cleanSender}>`;

    const { error: resendError } = await resend.batch.send([
      {
        from: fromFormatted,
        to: email,
        subject: "Project Inquiry Received - Zani. Studio",
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out. We've received your project details and will review them shortly.</p>
          <p>If you have any immediate questions, feel free to reply directly to this email.</p>
          <p>Best,<br/>Zani</p>
        `,
      },
      {
        from: fromFormatted,
        to: process.env.MY_NOTIFICATION_EMAIL || "hello@zani.studio",
        subject: `[New Inquiry] ${name} from ${company || "Unknown"}`,
        html: `
          <h3>New Contact Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Details:</strong><br/>${details || "N/A"}</p>
        `,
      },
    ]);

    if (resendError) {
      console.error("[Resend Error]:", resendError);
      return { error: "Failed to send email. Please check server logs." };
    }

    const discordRes = await fetch(process.env.CONTACT_DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Project Intake",
        embeds: [
          {
            title: "💬 New Project Inquiry",
            color: 0xedeae3,
            fields: [
              { name: "👤 Name", value: name, inline: true },
              {
                name: "🏢 Company",
                value: company || "*Not provided*",
                inline: true,
              },
              {
                name: "📧 Email",
                value: `[${email}](mailto:${email})`,
                inline: false,
              },
              {
                name: "📝 Details",
                value: details || "*No details provided*",
                inline: false,
              },
            ],
            footer: { text: "Source: Contact Section Footer" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordRes.ok) {
      console.error("[Discord Error]:", await discordRes.text());
    }

    return { success: true };
  } catch (err) {
    console.error("Submission error:", err);
    return { error: "Failed to send message. Please try emailing directly." };
  }
}

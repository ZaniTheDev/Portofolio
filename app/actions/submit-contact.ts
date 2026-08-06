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
        replyTo: "hamzahtizani@gmail.com", // Routes client replies directly to your Gmail
        subject: "Inquiry Received: Let's build your machine.",
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #14171A; max-width: 600px; line-height: 1.6; padding: 20px 0;">
              <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.5px;">Transmission Received.</h2>
              
              <p style="font-size: 16px; margin-bottom: 16px;">Hi ${name},</p>
              
              <p style="font-size: 16px; margin-bottom: 16px;">Your project details just landed on my desk. Thanks for reaching out.</p>
              
              <p style="font-size: 16px; margin-bottom: 16px;">At <strong>Zani. Studio</strong>, the goal is simple: stop paying for dead-end clicks and generic templates, and start building digital systems that automate your bookings and drive real revenue.</p>
              
              <p style="font-size: 16px; margin-bottom: 16px;">I am reviewing the information you provided${company ? ` for ${company}` : ""} and will be in touch within the next 24 to 48 hours to discuss your bottlenecks and how we can engineer a solution.</p>
              
              <p style="font-size: 16px; margin-bottom: 32px;">If you have any immediate thoughts or extra details to add, simply reply directly to this thread.</p>
              
              <hr style="border: none; border-top: 1px solid #D8D3C7; margin: 32px 0;" />
              
              <p style="font-size: 14px; color: #14171A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 700;">Zani.</p>
              <p style="font-size: 12px; color: #8A8F94; margin-bottom: 8px;">Digital Architecture & Automation</p>
              <a href="https://zanidev.site" style="color: #B4622A; text-decoration: none; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">zanidev.site</a>
            </div>
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

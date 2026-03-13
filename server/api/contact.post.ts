import nodemailer from "nodemailer";

const GMAIL_ADDRESS = "contact@banzab.com";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { type, firstName, lastName, email, phone, company, subject, message } = body;

  if (!firstName || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "First name, email, and message are required.",
    });
  }

  const { gmailAppPassword } = useRuntimeConfig();

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_ADDRESS,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${fullName}" <${GMAIL_ADDRESS}>`,
      replyTo: email,
      to: GMAIL_ADDRESS,
      subject: subject || `Contact form message from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nType: ${type || "N/A"}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${type ? `<p><strong>Inquiry Type:</strong> ${type}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <hr />
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    console.error("Email send error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email.",
    });
  }
});

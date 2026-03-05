import nodemailer from "nodemailer";

const GMAIL_ADDRESS = "contact@banzab.com";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name, email, and message are required.",
    });
  }

  const { gmailAppPassword } = useRuntimeConfig();

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
      from: `"${name}" <${GMAIL_ADDRESS}>`,
      replyTo: email,
      to: GMAIL_ADDRESS,
      subject: subject || `Contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
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

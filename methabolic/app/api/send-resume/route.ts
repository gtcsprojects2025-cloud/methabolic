// src/app/api/send-resume/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string | null;
  const resume = formData.get("resume") as File;

  if (!resume) {
    return NextResponse.json({ error: "No resume uploaded" }, { status: 400 });
  }

  const arrayBuffer = await resume.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    await resend.emails.send({
      from: "Join Us Application <no-reply@yourdomain.com>",
      to: "metabolomicsafrica@gmail.com",
      subject: `New Application from ${name}`,
      replyTo: email,
      text: `
New Join Us application:

Name: ${name}
Email: ${email}

Message:
${message || "No message provided"}

Attached: ${resume.name}
      `.trim(),
      attachments: [
        {
          filename: resume.name,
          content: buffer.toString("base64"),
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
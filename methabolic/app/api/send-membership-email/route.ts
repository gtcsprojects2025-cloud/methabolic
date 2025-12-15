// src/app/api/send-membership-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { fullName, email, contribution } = await request.json();

  try {
    await resend.emails.send({
      from: "Membership <onboarding@yourdomain.com>",
      to: "metabolomicsafrica@gmail.com", // Your footer email
      subject: `New Membership Interest from ${fullName}`,
      //add document option too
      text: `
        Name: ${fullName}
        Email: ${email}
      
        
        Contribution:
        ${contribution}
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
// // src/app/api/send-membership-email/route.ts
// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//   const { fullName, email, contribution } = await request.json();

//   try {
//     await resend.emails.send({
//       from: "Membership <onboarding@yourdomain.com>",
//       to: "metabolomicsafrica@gmail.com", 
//       text: `
//         Name: ${fullName}
//         Email: ${email}
      
        
//         Contribution:
//         ${contribution}
//       `,
//       replyTo: email,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
//   }
// }














// src/app/api/contact/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import sendWelcomeEmail from '../../membership/confirmationemail';

// Configure the Nodemailer transporter using your secure environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, contribution } = body;

    // Basic validation
    if (!fullName || !email || !contribution) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Email content setup
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'metabolomicsafrica@gmail.com', 
      subject: `New Contact Form Submission from Metabolimics Website: ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #10B981;">New Metabolimics Inquiry</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="border: 1px solid #ccc; padding: 15px; border-radius: 5px; background-color: #f9f9f9;">
               ${contribution}
            </div>
            <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                This message was sent from the Metabolimics Contact Page.
            </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    await sendWelcomeEmail(email, fullName);

    // Success response
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Email sending error:', error);
    // Error response
    return NextResponse.json({ 
        message: 'Failed to send email. Check server logs.',
        error: (error as Error).message,
    }, { status: 500 });
  }
}
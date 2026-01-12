import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure the Nodemailer transporter using your secure environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendWelcomeEmail(recipientEmail: any, recipientName: any) {
  try {
    await transporter.sendMail({
      from: '"Metabolomics Africa" <yourcompany@example.com>',
      to: recipientEmail,
      subject: "Welcome to the Revolution | Onboarding & Foundational Meeting",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome to the Revolution | Onboarding & Foundational Meeting</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
          .container { max-width: 700px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
          .header { background: #004d40; color: #ffffff; padding: 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 22px; }
          .content { padding: 30px; color: #333333; line-height: 1.6; }
          .content h2 { color: #004d40; margin-top: 20px; }
          .agenda, .steps { margin: 15px 0; padding-left: 20px; }
          .agenda li, .steps li { margin-bottom: 10px; }
          .highlight { background: #e0f2f1; padding: 10px; border-radius: 5px; margin: 15px 0; }
          .footer { background: #fafafa; padding: 20px; text-align: center; font-size: 13px; color: #666666; }
          a { color: #00695c; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Metabolomics Africa</h1>
            <p>Onboarding & Foundational Meeting Details</p>
          </div>
          <div class="content">
            <p>Dear Distinguished Colleague${recipientName ? `, ${recipientName}` : ""},</p>
            <p>Thank you for answering the call to join <strong>Metabolomics Africa</strong>. By registering, you have taken your place as a foundational stakeholder in an initiative dedicated to securing Africa’s metabolic and scientific future.</p>
            <p>Your expertise is now part of a unified continental front. We are moving swiftly from grassroots mobilization to formal institutional governance, and we are honored to have you with us.</p>

            <h2>1. Save the Date: First Foundational Meeting</h2>
            <div class="highlight">
              <p><strong>Date:</strong> Saturday, January 24th, 2026<br>
              <strong>Time:</strong> 12:00 PM EST<br>
              <strong>Location:</strong> <a href="https://us06web.zoom.us/j/85348118836?pwd=bEI0osDpToxlwjooKeu3xB5ahEb9zL.1">Zoom Link</a><br>
              <strong>Meeting ID:</strong> 853 4811 8836 | <strong>Passcode:</strong> 598033</p>
            </div>

            <h2>2. The Foundational Agenda</h2>
            <ul class="agenda">
              <li><strong>Governance:</strong> Reviewing structures for registration in Kenya and as a 501(c)(3) in the USA.</li>
              <li><strong>2026 Landmarks:</strong> Partnership and presence at the 1st African Metabolomics Conference (March 11–13, 2026).</li>
              <li><strong>Data Sovereignty:</strong> Establishing FAIR-aligned African Metabolome Database.</li>
              <li><strong>Board Nominations:</strong> Preliminary discussions on executive and advisory leadership roles.</li>
            </ul>

            <h2>3. Immediate Next Steps</h2>
            <ul class="steps">
              <li><strong>Review the Ecosystem:</strong> Visit <a href="https://metabolomicsafrica.org">metabolomicsafrica.org</a>.</li>
              <li><strong>Join the Conversation:</strong> Follow our <a href="https://www.linkedin.com/company/metabolomics-africa/?viewAsMember=true">LinkedIn page</a>.</li>
              <li><strong>Invite a Peer:</strong> Share the membership link <a href="https://metabolomicsafrica.org/membership">metabolomicsafrica.org/membership</a>.</li>
            </ul>

            <h2>4. Your Membership Profile</h2>
            <p>We are curating a professional directory of our foundational members. If you did not upload a high-resolution headshot or provide details of your field of work, please reply to this email with those details so we can properly recognize your contribution.</p>

            <p>We are ready to decode Africa's metabolic future. We look forward to seeing you on the 24th.</p>

            <p>Warm regards,<br>
            <strong>The Secretariat</strong><br>
            Metabolomics Africa<br>
            <a href="https://metabolomicsafrica.org">metabolomicsafrica.org</a></p>
          </div>
          <div class="footer">
            © 2026 Metabolomics Africa. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `,
    });

    console.log("Welcome email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
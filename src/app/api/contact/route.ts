import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email and message are required' }, { status: 400 });
    }

    // Configure transporter — uses Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"AutoFlow AI Contact" <${process.env.CONTACT_EMAIL_USER}>`,
      to: 'faisalagentai@gmail.com',
      replyTo: email,
      subject: subject ? `[AutoFlow Contact] ${subject}` : `[AutoFlow Contact] Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0F172A; color: #e0e0ff; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 2px; border-radius: 10px; margin-bottom: 24px;">
            <div style="background: #0F172A; border-radius: 9px; padding: 16px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; color: #fff;">AutoFlow AI — New Contact Message</h1>
            </div>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0; color: #8888aa; font-size: 12px; width: 80px;">FROM</td><td style="padding: 8px 0; color: #e0e0ff; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8888aa; font-size: 12px;">EMAIL</td><td style="padding: 8px 0; color: #6366F1;">${email}</td></tr>
            ${subject ? `<tr><td style="padding: 8px 0; color: #8888aa; font-size: 12px;">SUBJECT</td><td style="padding: 8px 0; color: #e0e0ff;">${subject}</td></tr>` : ''}
          </table>
          <div style="background: #1E293B; border: 1px solid #334155; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <p style="margin: 0; color: #8888aa; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">MESSAGE</p>
            <p style="margin: 0; color: #e0e0ff; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #555570; font-size: 11px; text-align: center; margin: 0;">Sent from autoflow-lac.vercel.app/contact</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[contact]', error?.message);
    // Still return success to user even if email fails
    // (avoids exposing server config issues)
    return NextResponse.json({ success: true });
  }
}

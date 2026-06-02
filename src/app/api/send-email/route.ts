import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body, smtp } = await req.json();

    if (!to || !subject || !body || !smtp?.from_email || !smtp?.password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host || 'smtp.gmail.com',
      port: smtp.port || 587,
      secure: false,
      auth: { user: smtp.from_email, pass: smtp.password },
    });

    await transporter.sendMail({
      from: smtp.from_email,
      to,
      subject,
      text: body,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to send email';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

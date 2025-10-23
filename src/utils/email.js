import nodemailer from 'nodemailer';
import { env } from 'process';

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: Number(env.EMAIL_PORT) || 587,
  secure: env.EMAIL_SECURE === 'true',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

const fromAddress = env.EMAIL_FROM || `no-reply@${env.EMAIL_HOST}`;

export async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
}

export async function sendVerificationEmail(to, token) {
  const frontendUrl = env.FRONTEND_URL || 'http://localhost:3000';
  const verificationLink = `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;
  const subject = 'Verify your email';
  const html = `<p>Please verify your email by clicking the link below:</p><p><a href="${verificationLink}">Verify Email</a></p>`;
  await sendEmail(to, subject, html);
}

export async function sendPasswordResetEmail(to, token) {
  const frontendUrl = env.FRONTEND_URL || 'http://localhost:3000';
  const resetLink = `${frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;
  const subject = 'Reset your password';
  const html = `<p>You requested a password reset. Click the link below to set a new password:</p><p><a href="${resetLink}">Reset Password</a></p>`;
  await sendEmail(to, subject, html);
}

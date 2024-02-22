import nodemailer, { Transporter } from 'nodemailer'
import path from 'path';
import ejs from 'ejs';
import AppError from './errorHandler';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html: string;
}

class EmailSender {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    });
  }

  async sendEmail(toAddress: string, subject: string, text: string, html: string): Promise<void> {
    try {
      const mailOptions: MailOptions = {
        from: process.env.EMAIL_USERNAME!,
        to: toAddress,
        subject: subject,
        text: text,
        html: html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Email sent to:', toAddress);
    } catch (error: any) {
      throw new AppError('Failed to send email', 500);
    }
  }

  async sendWelcomeEmail(user: any): Promise<void> {
    // Template rendering logic
  }

  async sendPasswordResetEmail(user: any, resetToken: string, url: string): Promise<void> {
    // Template rendering logic
  }
}

export default EmailSender;

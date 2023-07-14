import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      }
    });
  }

  async sendMail(email: String, verifyCode: number) {
    try {
      await this.transporter.sendMail({
        to: email,
        from: process.env.EMAIL_FROM,
        subject: '[Booklog] 이메일 인증',
        html: `<b>[Booklog] 이메일 인증</b><p>${verifyCode}</p>`, 
      });
    } catch (error) {
      console.error(error);
    }
  }
}
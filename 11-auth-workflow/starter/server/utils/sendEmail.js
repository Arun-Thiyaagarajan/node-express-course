import nodemailer from 'nodemailer';
import nodeMailerConfig from './nodeMailerConfig.js';

const sendEmail = async ({ to, subject, html }) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport(nodeMailerConfig);

    return await transporter.sendMail({
        from: '"Tester" <tester@gmail.com>', // sender address
        to,
        subject,
        html
    });
}

export default sendEmail;
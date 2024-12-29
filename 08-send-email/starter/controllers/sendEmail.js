import { StatusCodes } from "http-status-codes";
import { createTestAccount, createTransport } from "nodemailer";
import sgMail from "@sendgrid/mail";

const sendEmailEthereal = async (req, res) => {
    let testAccount = await createTestAccount();
    let transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'blaze.renner82@ethereal.email', // generated ethereal email
            pass: '9pJ8YSkdttaz8X6d9x', // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '"Arun" <arunthiyaagarajan.ta@gmail.com>',
        to: 'bar@emaple.com',
        subject: "Test Email",
        html: "<h1>Testing Emails</h1>",
    });

    res.status(StatusCodes.OK).json(info);
}

const sendEmail = async (req, res) => { 
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
        to: 'testerarun.dev@gmail.com', // Change to your recipient
        from: 'hello@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    const info = await sgMail.send(msg);
    res.json(info);
}


export default sendEmail;
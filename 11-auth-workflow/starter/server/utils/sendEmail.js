import nodemailer from 'nodemailer';

const sendEmail = async () => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'sydnee.jenkins83@ethereal.email',
            pass: 'S4eZCv4SuV1F3F2FXD'
        }
    });
    
    const info = await transporter.sendMail({
        from: '"Tester" <tester@gmail.com>', // sender address
        to: "user@gmail.com", // list of receivers
        subject: "Testing Email", // Subject line
        text: `<p>
        Your Verification Link:
        <a href='#'>Click here</a>
        </p>`, // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}

export default sendEmail;
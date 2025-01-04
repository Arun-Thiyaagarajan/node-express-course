import sendEmail from "./sendEmail.js"


const sendVerificationEmail = async ({name, email, verificationToken, origin}) => {

    const verifyEmailRedirectURL = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
    const msg = `
    <p>
        <span>Please confirm your email by clicking on the following link: </span>
        <a href="${verifyEmailRedirectURL}">Verify Email</a> 
    </p>`;

    return sendEmail({
        to: email,
        subject: 'Email Verification',
        html: `
            <h4>Hello ${name}</h4>
            ${msg}
        `
    });
}

export default sendVerificationEmail;
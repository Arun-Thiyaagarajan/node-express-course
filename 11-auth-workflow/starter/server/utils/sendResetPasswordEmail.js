import sendEmail from "./sendEmail.js"


const sendResetPasswordEmail = async ({name, email, passwordToken, origin}) => {

    const resetPasswordRedirectURL = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;
    const msg = `
    <p>
        <span>Reset your Password by clicking on the following link: </span>
        <a href="${resetPasswordRedirectURL}">Reset Password</a> 
    </p>`;

    return sendEmail({
        to: email,
        subject: 'Reset Password',
        html: `
            <h4>Hello ${name}</h4>
            ${msg}
        `
    });
}

export default sendResetPasswordEmail;
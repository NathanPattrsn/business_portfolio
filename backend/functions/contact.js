const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // The body is received as a FormData object, so we need to parse it
    const data = Object.fromEntries(new URLSearchParams(event.body));

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.PASSWORD, // Your email password
        },
    });

    let mailOptions = {
        from: data.email,
        to: 'onesitedesigns@gmail.com',
        subject: `Contact from ${data.name}`,
        text: data.message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: 'ok',
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.toString()}`,
        };
    }
};

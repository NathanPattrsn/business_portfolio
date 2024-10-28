const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const data = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail', // Or your chosen email service
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
            body: 'Email sent successfully!',
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.toString()}`,
        };
    }
};

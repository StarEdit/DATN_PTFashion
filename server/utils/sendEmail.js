import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    message: options.message,
    html: options.html,
  };

  await transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("email send successfully");
    }
  });
};
export default sendEmail;

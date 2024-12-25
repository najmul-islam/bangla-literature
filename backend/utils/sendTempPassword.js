const nodemailer = require("../configs/nodemailer");

const sendTempPassword = async (user) => {
  try {
    const transporter = nodemailer();
    const mailOption = {
      from: `"bangla-literature" <${process.env.NODEMAILER_EMAIL}>`,
      to: user.email,
      subject: "bangla-literature reset password",
      html: `
    <a href="${process.env.CLIENT_URL}">Bangla Literature</a>
    <p>Please use the following code for your <strong>Bangla Literaure</strong> verification code: <strong>${user.tempPassword}</strong></p>
    `,
    };

    await transporter.sendMail(mailOption);
    console.log("Temp Password sent in mail");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendTempPassword;

const nodemailer = require("../configs/nodemailer");

const sendTempPassword = async (user) => {
  const transforter = nodemailer();
  const mailOption = await transforter.sendMail({
    from: `"bangla-literature" <${process.env.NODEMAILER_EMAIL}>`,
    to: user.email,
    subject: "bangla-literature reset password",
    html: `
    <a href="${CLIENT_URL}">Bangla Literature</a>
    <p>Please use the following code for your API Ninjas verification code: <storng>${user.tempPassword}</storng></p>
    `,
  });

  transforter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification email sent");
    }
  });
};

module.exports = sendTempPassword;

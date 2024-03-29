const nodemailer = require("../configs/nodemailer");

const sendVerificationEmail = async (user) => {
  const transforter = nodemailer();
  const mailOption = await transforter.sendMail({
    from: `"bangla-literature" <${process.env.NODEMAILER_EMAIL}>`,
    to: user.email,
    subject: "bangla-literature verification link",
    html: `
    <p>Hello ${user.name}, verify your email by clicking this link</p>
    <a href='${process.env.CLIENT_URL}/verify-email?emailToken=${user.emailToken}'>Verify Your Email</a>
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

module.exports = sendVerificationEmail;

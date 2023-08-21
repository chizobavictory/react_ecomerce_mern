import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const sendMail = async (name, recipient, OTP) => {
  const accessToken = await oauth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOption = {
    subject: "ANYSTORE OTP VERIFICATION",
    from: process.env.EMAIL,
    text: `Hi, ${name}. Welcome to Anyshop, your OTP is: ${OTP}`,
    html: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="https://anyshop.herokuapp.com" style="font-size:1.4em;color: #ff4200;text-decoration:none;font-weight:600">Anyshop </a>
        </div>
        <p style="font-size:1.1em; color: white">Hi,${name}</p>
        <p>Thank you for choosing Anyshop. Use the following OTP to complete your Sign Up procedures. OTP is valid for 3 minutes</p>
        <a tyle="text-decoration: none; color:white" href="https://anyshop.herokuapp.com/verifyphone"><h2 style="background: #ff4200;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2></a>
        <p style="font-size:0.9em;">Regards,<br />Anyshop </p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p style="color: #ff4200">Anyshop  Inc</p>
          <p>Lagos, Nigeria<p>California</p>
        </div>
      </div>
    </div>
    `,
    to: recipient,
  };

  try {
    const result = await transport.sendMail(mailOption);
    console.log(`OTP Email sent to the user - ${recipient} successfully`);
    return OTP;
  } catch (err) {
    console.log(err);
  } finally {
    transport.close();
  }
  sendMail()
    .then((result) => console.log("Email sent....", result))
    .catch((err) => console.log(err));
};


export default sendMail;

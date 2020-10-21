const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_OAUTH_CLIENT_ID, // ClientID
  process.env.GMAIL_OAUTH_CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "aniket.biswas75@gmail.com", 
         clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
         clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
         refreshToken: process.env.GMAIL_REFRESH_TOKEN,
         accessToken: accessToken
    }
});

  

  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});


exports.sendMail = functions.https.onCall((data, context) => {
  const contents = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${data.QRcode}&size=100x100" alt="QRコード" />`;
  let email = {
    from: gmailEmail,
    to: data.destination,
    subject: 'test message',
    html: `<h1>Thank you for your kind join</h1>. <p>Your QRCode is here. </p> ${contents}`
  };
  mailTransport.sendMail(email, (err, info) => {
    if (err) {
      return console.log(err);
    }
    return console.log('success');
  });

});

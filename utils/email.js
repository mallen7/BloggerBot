const nodemailer = require('nodemailer');

async function sendEmail(adminEmail, blogContent, articles) {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'mallen7@sent.com', // your Fastmail email
      pass: 'a6sm2a98uzstlnqe' // your Fastmail password
    }
  });

  // Email data
  let mailOptions = {
    from: 'mallen7@sent.com',
    to: adminEmail,
    subject: 'New Blog Post Created',
    text: `Blog Content: ${blogContent}\n\nArticles Used: ${articles.join(', ')}`
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;

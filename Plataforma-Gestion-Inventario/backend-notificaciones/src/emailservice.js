require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendStockNotification = (productName, currentStock) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIF_EMAIL,
    subject: `Stock bajo de ${productName}`,
    text: `El producto ${productName} tiene solo ${currentStock} unidades restantes. Por favor, realice un pedido.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo:", error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });
};

module.exports = { sendStockNotification };

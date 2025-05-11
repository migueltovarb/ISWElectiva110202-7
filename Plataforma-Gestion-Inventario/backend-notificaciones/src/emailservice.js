const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "juancarlospabon01@gmail.com",
    pass: "523570",
  },
});

const sendStockNotification = (productName, currentStock) => {
  const mailOptions = {
    from: "juancarlospabon01@gmail.com",
    to: "ingejhon01@gmail.com",
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

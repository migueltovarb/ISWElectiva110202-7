const { sendStockNotification } = require("./emailservice.js");

const checkStock = (productos) => {
  const umbralStock = 3;
  productos.forEach((producto) => {
    if (producto.stock <= umbralStock) {
      sendStockNotification(producto.nombre, producto.stock);
    }
  });
};
module.exports = { checkStock };

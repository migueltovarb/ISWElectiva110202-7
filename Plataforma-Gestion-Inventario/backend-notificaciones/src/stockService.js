const { sendStockNotification } = require("./emailservice.js");

let productos = [
  { id: 1, nombre: "Producto A", stock: 5 },
  { id: 2, nombre: "Producto B", stock: 2 },
  { id: 3, nombre: "Producto C", stock: 10 },
];

const umbralStock = 3;

const checkStock = () => {
  productos.forEach((producto) => {
    if (producto.stock <= umbralStock) {
      sendStockNotification(producto.nombre, producto.stock);
    }
  });
};

setInterval(checkStock, 300000);

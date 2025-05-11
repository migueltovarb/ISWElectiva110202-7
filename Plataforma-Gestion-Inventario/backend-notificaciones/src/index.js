const express = require("express");
const { checkStock } = require("./stockService.js");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Stock bajo");
});

app.get("/check-stock", (req, res) => {
  const product = { stock: 10, stockMin: 5 };
  const isLowStock = checkStock(product);

  if (isLowStock) {
    res.send("Stock bajo para el producto");
  } else {
    res.send("Stock suficiente");
  }
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

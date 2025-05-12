const express = require("express");
const cors = require("cors");
const { checkStock } = require("./stockService");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.post("/api/check-stock", (req, res) => {
  const productos = req.body.productos;
  if (!Array.isArray(productos)) {
    return res.status(400).send("Productos no validos");
  }

  checkStock(productos);
  res.send("Stock correcto");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

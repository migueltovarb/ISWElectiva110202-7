import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const updateStockProducto = async (productoId, stockData) => {
  console.log("productoId:", productoId);
  const response = await axios.put(
    `${API_URL}/stock/actualizar/${productoId}/`,
    stockData,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const getStockProducto = async (productoId) => {
  const res = await axios.get(`${API_URL}/stock/actualizar/${productoId}/`);
  return res.data;
};

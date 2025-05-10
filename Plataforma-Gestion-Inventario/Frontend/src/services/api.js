import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createProducto = async (productoData) => {
  try {
    const response = await axios.post(API_URL, productoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear el producto",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

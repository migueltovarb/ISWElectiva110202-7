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

export const getProducto = async () => {
  try {
  } catch (error) {
    console.error(
      "Error al obtener los productos",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, productoData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el producto",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el producto",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

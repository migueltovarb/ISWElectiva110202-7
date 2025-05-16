import React from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const getHistorialTransferenciasService = async () => {
  const response = await axios.get(`${API_URL}/movimiento/movimientos/`);
  return response.data;
};

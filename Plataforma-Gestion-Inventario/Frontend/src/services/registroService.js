import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registroMovimiento = async (data) => {
  const response = await axios.post(`${API_URL}/registro/movimientos/`, data);
  return response.data;
};

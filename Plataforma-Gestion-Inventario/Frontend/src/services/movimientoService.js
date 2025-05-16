import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const createMovimiento = async (movData) => {
  const resp = await axios.post(`${API_URL}/movimientos/`, movData, {
    headers: { "Content-Type": "application/json" },
  });
  return resp.data;
};

export const getMovimientos = async (productoId = null) => {
  const resp = await axios.get(url);
  return resp.data;
};

export const getMovimientoById = async (id) => {
  const resp = await axios.get(`${API_URL}/movimientos/${id}/`);
  return resp.data;
};

export const updateMovimiento = async (id, movData) => {
  const resp = await axios.put(`${API_URL}/movimientos/${id}/`, movData, {
    headers: { "Content-Type": "application/json" },
  });
  return resp.data;
};

export const deleteMovimiento = async (id) => {
  const resp = await axios.delete(`${API_URL}/movimientos/${id}/`);
  return resp.data;
};

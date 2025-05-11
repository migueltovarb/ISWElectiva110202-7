import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  const response = await axios.get(`${API_URL}/productos/`);
  return response.data;
};

export const getUsuarios = async () => {
  const response = await axios.get(`${API_URL}/usuarios/`);
  return response.data;
};

export const getTiposMovimiento = async () => {
  const response = await axios.get(`${API_URL}/tipos-movimiento/`);
  return response.data;
};

export const getEstadosEjecucion = async () => {
  const response = await axios.get(`${API_URL}/estados-ejecucion/`);
  return response.data;
};

export const createMovimientoStock = async (data) => {
  const response = await axios.post(`${API_URL}/movimientos-stock/`, data);
  return response.data;
};

export const getMovimientosStock = async () => {
  const response = await axios.get(`${API_URL}/movimientos-stock/`);
  return response.data;
};

export const updateMovimientoStock = async (id, data) => {
  const response = await axios.put(`${API_URL}/movimientos-stock/${id}/`, data);
  return response.data;
};

export const deleteMovimientoStock = async (id) => {
  const response = await axios.delete(`${API_URL}/movimientos-stock/${id}/`);
  return response.data;
};

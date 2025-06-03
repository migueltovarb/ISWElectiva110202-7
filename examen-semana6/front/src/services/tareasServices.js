import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const CrudTareaPost = async (tareaData) => {
  try {
    const response = await axios.post(`${API_URL}/tareas/`, tareaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al registrar la tarea",
      err.response.data || err.message
    );
    throw error;
  }
};

export const CrudTareaGet = async () => {
  try {
    const response = await axios.get(`${API_URL}/tareas/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener tareas",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const CrudTareaPut = async (pk, tareaData) => {
  try {
    const response = await axios.put(`${API_URL}/tareas/${pk}/`, tareaData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la tarea:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const CrudTareaDelete = async (pk) => {
  try {
    const response = await axios.delete(`${API_URL}/tareas/${pk}/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar la tarea:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const BuscarTareaPorId = async (pk) => {
  const response = await axios.get(`${API_URL}/tareas/${pk}/`);
  return response.data;
};

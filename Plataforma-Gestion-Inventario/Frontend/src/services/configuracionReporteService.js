const API_URL = import.meta.env.VITE_API_URL;

export const createConfiguracionReporte = async (data) => {
  const res = await fetch(`${API_URL}/configuraciones/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

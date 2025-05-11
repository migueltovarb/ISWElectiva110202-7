const API_URL = import.meta.env.VITE_API_URL;

export const createInforme = async (data) => {
  const res = await fetch(`${API_URL}/informes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

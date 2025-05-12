import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createUsuario = async (usuario) => {
  const res = await fetch(`${API_URL}/usuario/usuarios/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return res.json();
};

export const getRoles = async () => {
  const res = await fetch(`${API_URL}/usuario/roles/`);
  return res.json();
};

export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuario/usuarios/`);
  return res.json();
};

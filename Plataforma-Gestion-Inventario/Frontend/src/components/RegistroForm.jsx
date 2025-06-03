import React, { useState } from "react";
import { registroMovimiento } from "/src/services/registroService";

const RegistroForm = () => {
  const [form, setForm] = useState({
    producto_id: "",
    tipo_movimiento_id: "",
    cantidad: "",
    usuario_id: "",
    estado_id: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.producto_id ||
      !form.tipo_movimiento_id ||
      !form.cantidad ||
      !form.usuario_id ||
      !form.estado_id
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(form.cantidad) || parseInt(form.cantidad) <= 0) {
      setError("La cantidad debe ser un número positivo.");
      return;
    }

    const payload = {
      producto: parseInt(form.producto_id),
      tipo_movimiento: parseInt(form.tipo_movimiento_id),
      cantidad: parseInt(form.cantidad),
      usuario: parseInt(form.usuario_id),
      estado: parseInt(form.estado_id),
    };

    try {
      const data = await registroMovimiento(payload);
      console.log("Movimiento registrado:", data);
      setError("");
    } catch (error) {
      setError(
        "Error al registrar: " + (error.response?.data || error.message)
      );
      console.error(
        "Error al registrar:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="producto_id"
        value={form.producto_id}
        onChange={handleChange}
        placeholder="Producto ID"
      />
      <input
        name="tipo_movimiento_id"
        value={form.tipo_movimiento_id}
        onChange={handleChange}
        placeholder="Tipo Movimiento ID"
      />
      <input
        name="cantidad"
        type="number"
        value={form.cantidad}
        onChange={handleChange}
        placeholder="Cantidad"
      />
      <input
        name="usuario_id"
        value={form.usuario_id}
        onChange={handleChange}
        placeholder="Usuario ID"
      />
      <input
        name="estado_id"
        value={form.estado_id}
        onChange={handleChange}
        placeholder="Estado ID"
      />
      <button stype="submit">Registrar Movimiento</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default RegistroForm;

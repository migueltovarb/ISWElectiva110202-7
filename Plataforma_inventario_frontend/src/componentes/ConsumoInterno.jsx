import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

export function ConsumoInterno({ onDone }) {
  const [form, setForm] = useState({ producto: "", cantidad: "", motivo: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        producto: form.producto,
        cantidad: parseInt(form.cantidad, 10),
        motivo: form.motivo,
      };
      const { data } = await axios.post(
        `${API_BASE}/consumos-internos/`,
        payload,
        { withCredentials: true }
      );
      setMessage(data.message || "Consumo registrado");
      setForm({ producto: "", cantidad: "", motivo: "" });
      onDone?.();
    } catch (err) {
      console.error("Error al registrar consumo:", err.response || err);
      const errMsg = err.response?.data
        ? Object.values(err.response.data).flat().join(" ")
        : "Error al registrar consumo";
      setMessage(errMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-green-100 rounded-2xl">
      <h2 className="text-center text-orange-400 text-xl font-bold mb-6">
        Registro de Consumo Interno
      </h2>

      {message && (
        <div className="mb-4 text-center text-green-800 font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm">
            Código de Producto
          </label>
          <input
            type="text"
            name="producto"
            value={form.producto}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            placeholder="Ingresa código del producto"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-sm">Motivo</label>
          <textarea
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            rows="3"
            placeholder="Explica el motivo del consumo"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl font-semibold"
        >
          Registrar Consumo
        </button>
      </form>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onDone}
          className="px-6 py-3 bg-cyan-300 hover:bg-cyan-400 rounded-2xl font-semibold"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function EditProduct({ onCancel, onUpdated }) {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    categoria: "",
    cantidad: "",
    precio: "",
    imagen: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/productos/${codigo}/`, { withCredentials: true })
      .then(({ data }) => {
        setForm({
          nombre: data.nombre || "",
          codigo: data.codigo || "",
          categoria: data.categoria || "",
          cantidad: data.cantidad != null ? String(data.cantidad) : "",
          precio: data.precio != null ? String(data.precio) : "",
          imagen: null,
        });
      })
      .catch(() => setMessage("Error al cargar el producto"))
      .finally(() => setLoading(false));
  }, [codigo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([k, v]) => v != null && payload.append(k, v));

    axios
      .patch(`${API_BASE}/productos/${codigo}/`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setMessage("Producto actualizado correctamente");
        onUpdated?.();
      })
      .catch((err) => {
        const data = err.response?.data;
        setMessage(
          data ? Object.values(data).flat().join(" ") : "Error al actualizar"
        );
      });
  };

  const handleCancel = () => (onCancel ? onCancel() : navigate(-1));

  console.error();
  if (loading) {
    return <div className="p-6 text-center">Cargando producto...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-green-100 rounded-2xl shadow-lg">
      <h2 className="text-center text-orange-400 text-2xl font-bold mb-6">
        Formulario de Edición de Productos
      </h2>
      {message && (
        <div className="mb-4 text-center text-green-800 font-medium">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-5"
      >
        {/* Nombre */}
        <div>
          <label className="block mb-1 font-medium">Nombre Producto</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-orange-300"
            required
          />
        </div>

        {/* Código */}
        <div>
          <label className="block mb-1 font-medium">Código Único</label>
          <input
            type="text"
            name="codigo"
            value={form.codigo}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Categoría</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white"
            required
          >
            <option value="" disabled>
              -- Seleccione Categoría --
            </option>
            {[
              "Materia Prima",
              "Productos Terminados",
              "Herramientas y Equipos",
              "Consumibles",
              "Repuestos",
              "Productos No Fabricados",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad */}
        <div>
          <label className="block mb-1 font-medium">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            min="0"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block mb-1 font-medium">Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            step="0.01"
            min="0"
            required
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block mb-1 font-medium">Cargar Imagen</label>
          <label className="inline-block px-5 py-3 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
            Seleccionar…
            <input
              type="file"
              name="imagen"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <p className="text-sm text-gray-600">
          La fecha y el usuario se registrarán automáticamente.
        </p>

        {/* Botones */}
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-orange-300 hover:bg-orange-400 text-white font-semibold rounded-2xl"
          >
            ACTUALIZAR PRODUCTO
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 bg-cyan-300 hover:bg-cyan-400 text-white font-semibold rounded-2xl"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
}

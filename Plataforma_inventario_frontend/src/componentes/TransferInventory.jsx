import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

// HU013: Gestión de Transferencias de Inventario
export function TransferInventory() {
  const [almacenes, setAlmacenes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({
    producto: "",
    cantidad: "",
    origen: "",
    destino: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/almacenes/`, { withCredentials: true })
      .then(({ data }) => setAlmacenes(data));
    axios
      .get(`${API_BASE}/api/productos/`, { withCredentials: true })
      .then(({ data }) => setProductos(data));
    axios
      .get(`${API_BASE}/api/transferencias/`, { withCredentials: true })
      .then(({ data }) => setTransfers(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        producto: parseInt(form.producto, 10),
        cantidad: parseInt(form.cantidad, 10),
        origen: parseInt(form.origen, 10),
        destino: parseInt(form.destino, 10),
      };
      const { data } = await axios.post(
        `${API_BASE}/api/transferencias/`,
        payload,
        { withCredentials: true }
      );
      setTransfers((prev) => [data, ...prev]);
      setMessage("Transferencia registrada correctamente");
      setForm({ producto: "", cantidad: "", origen: "", destino: "" });
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Error al registrar transferencia"
      );
    }
  };

  return (
    <div className="p-6 bg-green-100 rounded-2xl">
      <h2 className="text-center text-orange-400 text-xl font-bold mb-4">
        Transferencias de Inventario
      </h2>
      {message && (
        <div className="mb-4 text-center text-green-800">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <div>
          <label className="block text-sm font-medium">Producto</label>
          <select
            name="producto"
            value={form.producto}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          >
            <option value="">Seleccione producto</option>
            {productos.map((p) => (
              <option key={p.codigo} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Cantidad</label>
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Almacén Origen</label>
            <select
              name="origen"
              value={form.origen}
              onChange={handleChange}
              className="w-full p-2 rounded border"
              required
            >
              <option value="">Seleccione origen</option>
              {almacenes.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Almacén Destino</label>
            <select
              name="destino"
              value={form.destino}
              onChange={handleChange}
              className="w-full p-2 rounded border"
              required
            >
              <option value="">Seleccione destino</option>
              {almacenes.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl"
        >
          Registrar Transferencia
        </button>
      </form>
      <div className="overflow-auto mb-4">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Fecha</th>
              <th className="p-2">Producto</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Origen</th>
              <th className="p-2">Destino</th>
              <th className="p-2">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t.id} className="even:bg-white odd:bg-gray-50">
                <td className="p-2">{new Date(t.fecha).toLocaleString()}</td>
                <td className="p-2">{t.producto_nombre}</td>
                <td className="p-2">{t.cantidad}</td>
                <td className="p-2">{t.origen_nombre}</td>
                <td className="p-2">{t.destino_nombre}</td>
                <td className="p-2">{t.usuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end space-x-2">
        <a
          href={`${API_BASE}/api/transferencias/export/pdf`}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Exportar PDF
        </a>
        <a
          href={`${API_BASE}/api/transferencias/export/excel`}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Exportar Excel
        </a>
      </div>
    </div>
  );
}

import { useState } from "react";
import { createConfiguracionReporte } from "../services/configuracionReporteService";

const ConfiguracionReporteForm = () => {
  const [form, setForm] = useState({ nombre: "", descripcion: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createConfiguracionReporte(form);
    alert("Configuración guardada");
    setForm({ nombre: "", descripcion: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre del reporte"
      />
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ConfiguracionReporteForm;

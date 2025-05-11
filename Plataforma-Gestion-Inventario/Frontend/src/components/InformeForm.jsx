import { useState } from "react";
import { createInforme } from "../services/informeService";

const InformeForm = () => {
  const [form, setForm] = useState({ descripcion: "", fecha: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createInforme(form);
    alert("Informe guardado");
    setForm({ descripcion: "", fecha: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción del informe"
      />
      <input
        name="fecha"
        type="date"
        value={form.fecha}
        onChange={handleChange}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default InformeForm;

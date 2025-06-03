import React, { useEffect, useState } from "react";
import {
  createUsuario,
  getUsuarios,
  getRoles,
} from "../services/usuarioService";

const FormularioUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol_id: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getUsuarios().then(setUsuarios);
    getRoles().then(setRoles);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.contrasena.length < 8) {
      setMensaje("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const data = {
      nombre: form.nombre,
      correo: form.correo,
      contrasena: form.contrasena,
      rol_id: parseInt(form.rol_id),
    };

    if (!form.rol_id) {
      setMensaje("Debes seleccionar un rol.");
      return;
    }

    await createUsuario(data);
    setMensaje("Usuario guardado correctamente.");
    setForm({ nombre: "", correo: "", contrasena: "" });
    getUsuarios().then(setUsuarios);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mt-6">
        <div className="bg-[#CCE6CC] border border-black p-6 mb-6 rounded-lg">
          <h2 className="text-center uppercase font-bold text-xl mb-4 text-[#FFA500]">
            Formulario de registro de Usuario
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-1">NOMBRE</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full px-3 py-2 bg-[#D9D9D9] border border-black rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">CORREO ELECTRONICO</label>
              <input
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Correo"
                className="w-full px-3 py-2 bg-[#D9D9D9] border border-black rounded"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">CONTRASEÑA</label>
              <input
                name="contrasena"
                type="password"
                value={form.contrasena}
                onChange={handleChange}
                placeholder="Contraseña"
                className="w-full px-3 py-2 bg-[#D9D9D9] border border-black rounded"
              />
            </div>
            <div>
              <label className="font-block mb-1">ROL</label>
              <select
                name="rol_id"
                value={form.rol_id}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#D9D9D9] border-black rounded"
              >
                <option value="">Selecciona un rol</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-36 h-10 bg-[#00CCFF] border border-black uppercase font-bold rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() =>
                setForm({ nombre: "", correo: "", contrasena: "" })
              }
              className="w-36 h-10 bg-[#00CCFF] border border-black uppercase font-bold rounded"
            >
              Cancelar
            </button>
            {mensaje && <p>{mensaje}</p>}
          </form>
          <div className="bg-[#F0F0F0] border border-black p-4 rounded-lg">
            <h2 className="text-center font-bold mb-4">TABLA DE USUARIOS</h2>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black p-2">NOMBRE</th>
                  <th className="border border-black p-2">
                    CORREO ELECTRÓNICO
                  </th>
                  <th className="border border-black p-2">ROL</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.id} className="even:bg-gray-50">
                      <td className="border border-black p-2">{u.nombre}</td>
                      <td className="border border-black p-2">{u.correo}</td>
                      <td className="p-2 border border-black">
                        {u.rol_nombre}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioUsuario;

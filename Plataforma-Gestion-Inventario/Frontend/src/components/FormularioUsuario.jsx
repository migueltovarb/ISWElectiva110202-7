import React from "react";

const FormularioUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
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
    await createUsuario(form);
    setMensaje("Usuario guardado correctamente.");
    setForm({ nombre: "", correo: "", contrasena: "", rol: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        name="correo"
        value={form.correo}
        onChange={handleChange}
        placeholder="Correo"
      />
      <input
        name="contrasena"
        type="password"
        value={form.contrasena}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      <select name="rol" value={form.rol} onChange={handleChange}>
        <option value="">Selecciona un rol</option>
        {roles.map((r) => (
          <option key={r.id} value={r.id}>
            {r.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Guardar</button>
      <button
        type="button"
        onClick={() =>
          setForm({ nombre: "", correo: "", contrasena: "", rol: "" })
        }
      >
        Cancelar
      </button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default FormularioUsuario;

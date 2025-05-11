import React, { useState, useEffect } from "react";
import {
  createMovimientoStock,
  getProductos,
  getUsuarios,
  getTiposMovimiento,
  getEstadosEjecucion,
} from "../services/movimientoStockService";

const MovimientoStockForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    producto: "",
    cantidad: "",
    usuario: "",
    tipoMovimiento: "",
    estado: "",
  });
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tiposMovimiento, setTiposMovimiento] = useState([]);
  const [estadosEjecucion, setEstadosEjecucion] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Cargar datos necesarios para el formulario
    getProductos().then(setProductos);
    getUsuarios().then(setUsuarios);
    getTiposMovimiento().then(setTiposMovimiento);
    getEstadosEjecucion().then(setEstadosEjecucion);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMovimientoStock(formData);
      setMensaje("Movimiento registrado correctamente.");
      setFormData({
        producto: "",
        cantidad: "",
        usuario: "",
        tipoMovimiento: "",
        estado: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      setMensaje("Error al registrar el movimiento.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Movimiento de Stock</h2>
      <div>
        <label>Producto:</label>
        <select
          name="producto"
          value={formData.producto}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un producto</option>
          {productos.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Usuario:</label>
        <select
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tipo de Movimiento:</label>
        <select
          name="tipoMovimiento"
          value={formData.tipoMovimiento}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un tipo</option>
          {tiposMovimiento.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Estado de Ejecución:</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un estado</option>
          {estadosEjecucion.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Guardar</button>
      <button
        type="button"
        onClick={() =>
          setFormData({
            producto: "",
            cantidad: "",
            usuario: "",
            tipoMovimiento: "",
            estado: "",
          })
        }
      >
        Cancelar
      </button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default MovimientoStockForm;

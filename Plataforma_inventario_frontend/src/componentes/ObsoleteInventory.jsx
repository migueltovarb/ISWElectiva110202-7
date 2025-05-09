export function ObsoleteInventory() {
  const [form, setForm] = useState({ producto: "", estado: "Descontinuado" });
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/obsoletos/`, { withCredentials: true })
      .then(({ data }) => setRecords(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_BASE}/api/obsoletos/`, form, {
        withCredentials: true,
      });
      setRecords((prev) => [data, ...prev]);
      setMessage("Producto marcado correctamente");
      setForm({ producto: "", estado: "Descontinuado" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Error al marcar producto");
    }
  };

  const handleRevert = async (id) => {
    try {
      const { data } = await axios.post(
        `${API_BASE}/api/obsoletos/${id}/revertir/`,
        {},
        { withCredentials: true }
      );
      setRecords((prev) => prev.map((r) => (r.id === id ? data : r)));
    } catch {}
  };

  return (
    <div className="p-6 bg-green-100 rounded-2xl">
      <h2 className="text-center text-orange-400 text-xl font-bold mb-4">
        Inventario de Productos Obsoletos
      </h2>
      {message && (
        <div className="mb-4 text-center text-green-800">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <div>
          <label className="block text-sm font-medium">
            Código de Producto
          </label>
          <input
            type="text"
            name="producto"
            value={form.producto}
            onChange={handleChange}
            className="w-full p-2 rounded border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full p-2 rounded border"
          >
            <option value="Descontinuado">Descontinuado</option>
            <option value="Obsoleto">Obsoleto</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl"
        >
          Marcar Producto
        </button>
      </form>
      <div className="overflow-auto mb-4">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Código</th>
              <th className="p-2">Producto</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Marcado por</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="even:bg-white odd:bg-gray-50">
                <td className="p-2">{r.producto_codigo}</td>
                <td className="p-2">{r.producto_nombre}</td>
                <td className="p-2">{r.estado}</td>
                <td className="p-2">
                  {new Date(r.fecha_marcado).toLocaleDateString()}
                </td>
                <td className="p-2">{r.marcado_por}</td>
                <td className="p-2">
                  {!r.revertido && (
                    <button
                      onClick={() => handleRevert(r.id)}
                      className="px-3 py-1 bg-cyan-300 rounded"
                    >
                      Revertir
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end space-x-2">
        <a
          href={`${API_BASE}/api/obsoletos/export/pdf`}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Exportar PDF
        </a>
        <a
          href={`${API_BASE}/api/obsoletos/export/excel`}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Exportar Excel
        </a>
      </div>
    </div>
  );
}

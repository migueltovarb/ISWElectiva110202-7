import { render, fireEvent, waitFor } from "@testing-library/react";
import ConfiguracionReporteForm from "./ConfiguracionReporteForm";

vi.mock("../services/configuracionReporteService", () => ({
  createConfiguracionReporte: () => Promise.resolve({}),
}));

test("envía el formulario de configuración de reporte", async () => {
  const { getByText, getByRole } = render(<ConfiguracionReporteForm />);
  await waitFor(() => getByRole("button", { name: "Guardar" }));
  fireEvent.change(getByRole("textbox"), {
    target: { value: "Reporte Diario" },
  });
  fireEvent.change(getByRole("textbox", { name: "Descripción" }), {
    target: { value: "Descripción del reporte" },
  });
  fireEvent.click(getByText("Guardar"));
});

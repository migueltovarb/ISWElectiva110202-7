import { render, fireEvent, waitFor } from "@testing-library/react";
import InformeForm from "./InformeForm";

vi.mock("../services/informeService", () => ({
  createInforme: () => Promise.resolve({}),
}));

test("envía el formulario de informe", async () => {
  const { getByText, getByRole } = render(<InformeForm />);
  await waitFor(() => getByRole("button", { name: "Guardar" }));
  fireEvent.change(getByRole("textbox"), {
    target: { value: "Informe de prueba" },
  });
  fireEvent.change(getByRole("textbox", { name: "Fecha" }), {
    target: { value: "2025-05-01" },
  });
  fireEvent.click(getByText("Guardar"));
});

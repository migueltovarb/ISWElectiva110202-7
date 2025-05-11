import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovimientoStockForm from "./MovimientoStockForm";
import * as service from "../services/movimientoStockService";

jest.mock("../services/movimientoStockService");

describe("MovimientoStockForm", () => {
  beforeEach(() => {
    service.getProductos.mockResolvedValue([{ id: 1, nombre: "Producto A" }]);
    service.getUsuarios.mockResolvedValue([{ id: 1, nombre: "Usuario A" }]);
    service.getTiposMovimiento.mockResolvedValue([
      { id: 1, nombre: "Entrada" },
    ]);
    service.getEstadosEjecucion.mockResolvedValue([
      { id: 1, nombre: "Completado" },
    ]);
    service.createMovimientoStock.mockResolvedValue({});
  });

  test("renders form and submits data", async () => {
    render(<MovimientoStockForm />);

    await waitFor(() =>
      expect(screen.getByLabelText(/Producto:/)).toBeInTheDocument()
    );

    fireEvent.change(screen.getByLabelText(/Producto:/), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Cantidad:/), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText(/Usuario:/), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Tipo de Movimiento:/), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Estado de Ejecución:/), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText(/Guardar/));

    await waitFor(() =>
      expect(
        screen.getByText(/Movimiento registrado correctamente./)
      ).toBeInTheDocument()
    );
  });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StockUpdate from "./StockUpdate";
import * as stockService from "../services/stockService";

jest.mock("../services/stockService");

describe("<StockUpdate />", () => {
  const fakeStock = { cantidad: 10, stock_minimo: 1, umbral_minimo: 2 };

  beforeEach(() => {
    stockService.getStockByProducto.mockResolvedValue(fakeStock);
    stockService.updateStock.mockResolvedValue({ ...fakeStock, cantidad: 15 });
  });

  it("muestra el stock y permite actualizarlo", async () => {
    render(<StockUpdate productoId={42} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(stockService.getStockByProducto).toHaveBeenCalledWith(42)
    );
    expect(screen.getByText(/stock actual/i)).toHaveTextContent("10");

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "15" } });
    fireEvent.click(screen.getByText(/actualizar stock/i));

    await waitFor(() =>
      expect(stockService.updateStock).toHaveBeenCalledWith(
        42,
        expect.objectContaining({ cantidad: 15 })
      )
    );
    expect(screen.getByText(/stock actual/i)).toHaveTextContent("15");
  });
});

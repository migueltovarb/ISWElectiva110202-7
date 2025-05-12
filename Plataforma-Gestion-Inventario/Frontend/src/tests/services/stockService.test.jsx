import axios from "axios";
import { getStockByProducto } from "./stockService";

jest.mock("axios");

describe("stockService", () => {
  it("debe obtener stock por producto", async () => {
    const fakeData = { cantidad: 5, stock_minimo: 1, umbral_minimo: 2 };
    axios.get.mockResolvedValue({ data: fakeData });

    const result = await getStockByProducto(42);
    expect(axios.get).toHaveBeenCalledWith("/api/actualizar/42/");
    expect(result).toEqual(fakeData);
  });
});

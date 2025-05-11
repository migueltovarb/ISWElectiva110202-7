import { render, screen, fireEvent } from "@testing-library/react";
import UsuarioForm from "../components/UsuarioForm";
import { vi } from "vitest";

vi.mock("../services/usuarioService", () => ({
  createUsuario: vi.fn(),
  getRoles: vi.fn(() => Promise.resolve([{ id: 1, nombre: "Admin" }])),
}));

describe("UsuarioForm", () => {
  it("muestra mensaje si contraseña es muy corta", async () => {
    render(<UsuarioForm />);
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Guardar"));
    expect(
      await screen.findByText(/La contraseña debe tener al menos 8 caracteres/)
    ).toBeInTheDocument();
  });
});

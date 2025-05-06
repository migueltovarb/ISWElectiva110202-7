import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
    coverage: {
      provider: "istanbul",
      enabled: true,
      reporter: ["text", "html"],
      reportsDirectory: "coverage",
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
});

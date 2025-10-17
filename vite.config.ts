import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
const VITE_API_BASE_URL = process.env.VITE_API_BASE_URL!;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },

  server: {
    proxy: {
      "/api": VITE_API_BASE_URL, // proxy backend API
    },
  },

  build: {
    minify: false, // Disable minification for the build
  },
});

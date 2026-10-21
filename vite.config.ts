import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

function generateSpaFallbacks(): Plugin {
  return {
    name: "generate-spa-fallbacks",
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, "./dist");
      const indexPath = path.join(distDir, "index.html");
      if (fs.existsSync(indexPath)) {
        const unityDir = path.join(distDir, "unitywasteremovals");
        fs.mkdirSync(unityDir, { recursive: true });
        fs.copyFileSync(indexPath, path.join(unityDir, "index.html"));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), generateSpaFallbacks()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});

import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyFallbacks(): Plugin {
  return {
    name: "copy-fallbacks",
    closeBundle() {
      const distDir = path.resolve(__dirname, "./dist");
      const unityIndex = path.join(distDir, "unitywasteremovals", "index.html");
      const unityHtml = path.join(distDir, "unitywasteremovals.html");
      if (fs.existsSync(unityIndex)) {
        fs.copyFileSync(unityIndex, unityHtml);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copyFallbacks()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        unitywasteremovals: path.resolve(__dirname, "unitywasteremovals/index.html"),
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});

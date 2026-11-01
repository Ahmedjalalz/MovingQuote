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
      const aldhouseIndex = path.join(distDir, "aldhouseandsmith", "index.html");
      const aldhouseHtml = path.join(distDir, "aldhouseandsmith.html");
      if (fs.existsSync(aldhouseIndex)) {
        fs.copyFileSync(aldhouseIndex, aldhouseHtml);
      }
      const frontlineIndex = path.join(distDir, "frontlinetransport", "index.html");
      const frontlineHtml = path.join(distDir, "frontlinetransport.html");
      if (fs.existsSync(frontlineIndex)) {
        fs.copyFileSync(frontlineIndex, frontlineHtml);
      }
      const budgetIndex = path.join(distDir, "budgetskipscoventry", "index.html");
      const budgetHtml = path.join(distDir, "budgetskipscoventry.html");
      if (fs.existsSync(budgetIndex)) {
        fs.copyFileSync(budgetIndex, budgetHtml);
      }
      const roads2roadsIndex = path.join(distDir, "roads2roads", "index.html");
      const roads2roadsHtml = path.join(distDir, "roads2roads.html");
      if (fs.existsSync(roads2roadsIndex)) {
        fs.copyFileSync(roads2roadsIndex, roads2roadsHtml);
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
        aldhouseandsmith: path.resolve(__dirname, "aldhouseandsmith/index.html"),
        frontlinetransport: path.resolve(__dirname, "frontlinetransport/index.html"),
        budgetskipscoventry: path.resolve(__dirname, "budgetskipscoventry/index.html"),
        roads2roads: path.resolve(__dirname, "roads2roads/index.html"),
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});

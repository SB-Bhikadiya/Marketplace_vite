import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "disable-import-analysis-error",
      handleHotUpdate({ file, server }) {
        // Ignore the error for JSX files without the .jsx or .tsx extension
        if (file.endsWith(".js")) {
          server.moduleGraph.getModuleById(file).skip = true;
        }
      },
    },
    react(),
  ],
});

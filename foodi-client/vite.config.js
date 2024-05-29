import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [react(), reactRefresh()],
  build: {
    outDir: "dist", // The directory where the build output will be placed
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const outDir =
    mode === "live" ? "dist-prod" : mode === "uat" ? "dist-uat" : "dist";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        process: "process/browser",
        buffer: "buffer",
        crypto: "crypto-browserify",
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
      },
    },
    build: {
      outDir,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      host: true,
      port: 3000,
    },
  };
});

import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  root: "netlify-shell",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [
    tanstackRouter({
      target: "react",
      routesDirectory: fileURLToPath(new URL("./src/routes", import.meta.url)),
      generatedRouteTree: fileURLToPath(new URL("./src/routeTree.gen.ts", import.meta.url)),
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    tsconfigPaths(),
    react(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  build: {
    outDir: fileURLToPath(new URL("./dist/client", import.meta.url)),
    emptyOutDir: true,
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react/jsx-runtime"],
          "router": ["@tanstack/react-router"],
          "query": ["@tanstack/react-query"],
        },
      },
    },
  },
});
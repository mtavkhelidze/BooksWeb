import reactPlugin from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/** @style {import("vite").UserConfig} */
export default defineConfig({
  build: {
    cssCodeSplit: true,
    cssMinify: true,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "effect": [
            "@effect/platform",
            "@effect/platform-browser",
            "@effect/schema",
            "effect",
          ],
          "mobx": ["mobx", "mobx-react-lite"],
          "react": [
            "flowbite-react",
            "react",
            "react-dom",
            "react-hook-form",
          ],
          "react-icons": ["react-icons"],
          "wouter": ["wouter"],
        },
      },
    },
    target: "es2015",
  },
  plugins: [
    tsconfigPaths(),
    reactPlugin({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { "version": "2023-11" }],
        ],
      },
    }),
  ],
});

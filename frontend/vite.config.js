// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["mock-aws-s3", "aws-sdk", "nock"],
  },
  build: {
    rollupOptions: {
      external: ["mock-aws-s3", "aws-sdk", "nock"],
    },
  },
});

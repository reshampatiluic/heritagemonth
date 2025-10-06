import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 👇 IMPORTANT: repo name with leading/trailing slashes
  base: "/heritagemonth/",
});

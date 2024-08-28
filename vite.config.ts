import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   base: "/react-ui",
   resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
});

import inject from "@medusajs/admin-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  /**
   * Add this to your .env file to specify the project to load admin extensions from.
   */
  const MEDUSA_PROJECT = env.VITE_MEDUSA_PROJECT || null;
  const sources = MEDUSA_PROJECT ? [MEDUSA_PROJECT] : [];

  return {
    plugins: [
      inspect(),
      react(),
      inject({
        sources,
      }),
    ],
    server: {
      open: true,
      allowedHosts: true
    },
    optimizeDeps: {
      entries: [],
      include: ["recharts"],
    },
  };
});

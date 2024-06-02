import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  server: {
    // ブラウザからローカルサーバ接続可能にする。
    host: true,
    // ホットリロード有効にする。
    watch: {
      usePolling: true
    }
    }
});

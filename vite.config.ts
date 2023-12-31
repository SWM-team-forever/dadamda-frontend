import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	base: "./",
	plugins: [
		react(),
		tsconfigPaths(),
		sentryVitePlugin({
			org: "dadamda",
			project: "dadamda-fe",
		}),
	],
	test: {
		environment: "jsdom",
	},
	build: {
		publicDir: "public",
		sourcemap: true,
		rollupOptions: {
			input: {
				main: "./index.html",
				sw: "./service-worker.js",
			},
		},
	},
});

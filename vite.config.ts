import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// All routes that should be prerendered to static HTML for SEO.
// Keep in sync with src/App.tsx routes (excluding /admin/*).
const PRERENDER_ROUTES = [
  "/",
  "/baumaschinen-verkaufen",
  "/ankauf",
  "/so-funktionierts",
  "/gebrauchtmaschinen",
  "/finanzierung",
  "/standorte",
  "/faq",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/agb",
  // Local SEO
  "/bagger-verkaufen-duesseldorf",
  "/bagger-verkaufen-koeln",
  "/bagger-verkaufen-dortmund",
  "/bagger-verkaufen-essen",
  "/bagger-verkaufen-duisburg",
  "/bagger-verkaufen-bochum",
  "/bagger-verkaufen-wuppertal",
  "/bagger-verkaufen-muenster",
  "/bagger-verkaufen-bielefeld",
  "/bagger-verkaufen-gelsenkirchen",
  "/bagger-verkaufen-krefeld",
  "/bagger-verkaufen-bonn",
  "/bagger-verkaufen-muelheim",
  "/bagger-verkaufen-oberhausen",
  "/bagger-verkaufen-moenchengladbach",
  "/bagger-verkaufen-aachen",
  // Ratgeber
  "/ratgeber",
  "/ratgeber/was-ist-mein-bagger-wert",
  "/ratgeber/baumaschinen-verkaufen-tipps",
  "/ratgeber/arbeitsbuehne-verkaufen-ratgeber",
  "/ratgeber/baumaschinen-ankauf-prozess",
  "/ratgeber/gebrauchte-baumaschinen-markt",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      (prerender as unknown as (opts: unknown) => unknown)({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          renderAfterDocumentEvent: "render-event",
          maxConcurrentRoutes: 4,
          headless: "new",
          launchOptions: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          },
        },
        postProcess(renderedRoute: {
          route: string;
          html: string;
        }) {
          // Strip dev-only tags & ensure absolute canonical/og urls survive
          renderedRoute.html = renderedRoute.html.replace(
            /<script[^>]*lovable-tagger[^<]*<\/script>/g,
            "",
          );
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          query: ["@tanstack/react-query"],
        },
      },
    },
  },
}));

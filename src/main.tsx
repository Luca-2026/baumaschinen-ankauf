import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to prerenderer (Puppeteer) that the app is ready to capture.
// Wait two frames so React commits + initial effects (SEOHead) run.
if (typeof window !== "undefined") {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.dispatchEvent(new Event("render-event"));
    });
  });
}

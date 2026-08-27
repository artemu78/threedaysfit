import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log(`Three Days Fit v${import.meta.env.VITE_APP_VERSION}`);

createRoot(document.getElementById("root")!).render(<App />);

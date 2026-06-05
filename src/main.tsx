import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initManualAuthBridge } from "@/integrations/supabase/auth";
import { initMockDataBridge } from "@/mocks/initMockDataBridge";

initManualAuthBridge();
initMockDataBridge();

createRoot(document.getElementById("root")!).render(<App />);

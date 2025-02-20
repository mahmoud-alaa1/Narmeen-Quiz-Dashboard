import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import OrdersProvider from "./context/OrdersProvider";

createRoot(document.getElementById("root")!).render(
  <OrdersProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </OrdersProvider>
);

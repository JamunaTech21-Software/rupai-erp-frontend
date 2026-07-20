import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
      position='top-right'
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#ffffff",
          color: "#111827",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "14px 16px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        },

        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },

        loading: {
          iconTheme: {
            primary: "#2563eb",
            secondary: "#ffffff",
          },
        },
      }}
    />
  </StrictMode>,
);

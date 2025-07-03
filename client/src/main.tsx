import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlashMessageProvider } from "./contexts/FlashMessageContext";
import { AuthProvider } from "./contexts/AuthContext";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FlashMessageProvider>
          <ScrollToTop />
          <AuthProvider>
            <App />
          </AuthProvider>
        </FlashMessageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);

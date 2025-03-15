import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import { ShopContextProvider } from "./context/Context";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <ShopContextProvider>
    <RouterProvider router={router} />
    <Toaster />
  </ShopContextProvider>
);

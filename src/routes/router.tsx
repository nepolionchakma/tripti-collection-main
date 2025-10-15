import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root/Root";
import Home from "@/Pages/Home/Home";
import About from "@/Pages/About/About";
import Contact from "@/Pages/Contact/Contact";
import Shop from "@/Pages/Shop/Shop";
import Error from "@/Pages/Error/Error";
import Login from "@/Pages/Login/Login";
import Profile from "@/Pages/Profile/Profile";
import Verify from "@/Pages/Admin/Verify/Verify";
import Dashboard from "@/Pages/Admin/Page/Dashboard/Dashboard";
import { Analytics } from "@/Pages/Admin/Page/Analytics/Analytics";
import { Sales } from "@/Pages/Admin/Page/Sales/Sales";
import { Warehouse } from "@/Pages/Admin/Page/Warehouse/Warehouse";
import { Transaction } from "@/Pages/Admin/Page/Transaction/Transaction";
import { Customer } from "@/Pages/Admin/Page/Customer/Customer";
import { Messages } from "@/Pages/Admin/Page/Messages/Messages";
import { Reports } from "@/Pages/Admin/Page/Reports/Reports";
import { ManageProducts } from "@/Pages/Admin/Page/ManageProducts/ManageProducts";
import Features from "@/components/Features/Features";
import { FeaturesProducts } from "@/Pages/FeaturesProducts/FeaturesProducts";
import Products from "@/Pages/Products/Products";
import ProductDetails from "@/Pages/Product/Product";
import ManageCatalog from "@/Pages/Admin/Page/ManageCatalog/ManageCatalog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product",
        children: [
          {
            path: "",
            element: <Error />,
          },
          {
            path: ":product_id",
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Verify />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "manage-catalog",
        element: <ManageCatalog />,
      },
      {
        path: "features-products",
        element: <FeaturesProducts />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "warehouse",
        element: <Warehouse />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;

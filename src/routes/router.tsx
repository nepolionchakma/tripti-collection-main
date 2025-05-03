import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root/Root";
import Home from "@/Pages/Home/Home";
import About from "@/Pages/About/About";
import Contact from "@/Pages/Contact/Contact";
import Features from "@/Pages/Features/Features";
import Shop from "@/Pages/Shop/Shop";
import Error from "@/Pages/Error/Error";
import Login from "@/Pages/Login/Login";
import Profile from "@/Pages/Profile/Profile";
import Verify from "@/Pages/Admin/Verify";
import Dashboard from "@/Pages/Admin/Page/Dashboard/Dashboard";
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
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;

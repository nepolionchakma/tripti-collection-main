import {
  BadgeDollarSign,
  Bug,
  ChartNoAxesCombined,
  FileText,
  LayoutDashboard,
  LucideUsers,
  Mail,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

export const menuData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: 2,
    title: "Analytics",
    path: "/analytics",
    icon: <ChartNoAxesCombined size={20} />,
  },
  {
    id: 3,
    title: "Sales",
    path: "/sales",
    icon: <BadgeDollarSign size={20} />,
  },
  // {
  //   id: 4,
  //   title: "Management",
  //   path: "/management",
  //   icon: <BadgeDollarSign size={20} />,
  // },
  {
    id: 5,
    title: "Products",
    path: "/products",
    icon: <ShoppingCart size={20} />,
  },
  {
    id: 6,
    title: "Costormer",
    path: "/costormer",
    icon: <LucideUsers size={20} />,
  },
  {
    id: 7,
    title: "Warehouse",
    path: "/warehouse",
    icon: <Warehouse size={20} />,
  },
  // {
  //   id: 9,
  //   title: "Notifications",
  //   path: "/notifications",
  //   icon: <BadgeDollarSign size={20} />,
  // },
  {
    id: 10,
    title: "Transaction",
    path: "/transaction",
    icon: <FileText size={20} />,
  },
  {
    id: 11,
    title: "Message",
    path: "/message",
    icon: <Mail size={20} />,
  },
  {
    id: 8,
    title: "Reports",
    path: "/reports",
    icon: <Bug size={20} />,
  },
];

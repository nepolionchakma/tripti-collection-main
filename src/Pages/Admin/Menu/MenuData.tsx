import {
  BadgeDollarSign,
  Bug,
  CassetteTape,
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
    path: "/dashboard/analytics",
    icon: <ChartNoAxesCombined size={20} />,
  },
  {
    id: 3,
    title: "Sales",
    path: "/dashboard/sales",
    icon: <BadgeDollarSign size={20} />,
  },
  // {
  //   id: 4,
  //   title: "Management",
  //   path: "/dashboard/management",
  //   icon: <BadgeDollarSign size={20} />,
  // },
  {
    id: 5,
    title: "Manage Products",
    path: "/dashboard/manage-products",
    icon: <ShoppingCart size={20} />,
  },
  {
    id: 12,
    title: "Features Products",
    path: "/dashboard/features-products",
    icon: <CassetteTape size={20} />,
  },
  {
    id: 6,
    title: "Customer",
    path: "/dashboard/customer",
    icon: <LucideUsers size={20} />,
  },
  {
    id: 7,
    title: "Warehouse",
    path: "/dashboard/warehouse",
    icon: <Warehouse size={20} />,
  },
  // {
  //   id: 9,
  //   title: "Notifications",
  //   path: "/dashboard/notifications",
  //   icon: <BadgeDollarSign size={20} />,
  // },
  {
    id: 10,
    title: "Transaction",
    path: "/dashboard/transaction",
    icon: <FileText size={20} />,
  },
  {
    id: 11,
    title: "Messages",
    path: "/dashboard/messages",
    icon: <Mail size={20} />,
  },
  {
    id: 8,
    title: "Reports",
    path: "/dashboard/reports",
    icon: <Bug size={20} />,
  },
];

"use client";

import {
  MdDashboard,
  MdOutlineChat,
  MdAddChart,
  MdWorkHistory,
  MdDesignServices,
} from "react-icons/md";
import { FaUsersCog, FaTasks, FaChartArea } from "react-icons/fa";
import { CiViewList, CiDeliveryTruck } from "react-icons/ci";
import { TbListDetails } from "react-icons/tb";
import { SiBlueprint } from "react-icons/si";
import MenuLink from "./menu-link/menu-link";
import styles from "./sidebar.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MenuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Empleados",
        path: "/dashboard/employee",
        icon: <FaUsersCog />,
      },
      {
        title: "Ordenes de Produccion",
        path: "/dashboard/orderList",
        icon: <CiViewList />,
      },
      {
        title: "Planos",
        path: "/dashboard/blueprint",
        icon: <SiBlueprint />,
      },
      {
        title: "Ordenes de Diseño",
        path: "/dashboard/orderDesign",
        icon: <MdDesignServices />,
      },
      {
        title: "Detalle de Orden",
        path: "/dashboard/orderDetail",
        icon: <TbListDetails />,
      },
      {
        title: "Estado de Ordenes",
        path: "/dashboard/orderTracking",
        icon: <CiDeliveryTruck />,
      },
      {
        title: "Tareas",
        path: "/dashboard/task",
        icon: <FaTasks />,
      },
      {
        title: "Historial de Trabajo",
        path: "/dashboard/history",
        icon: <MdWorkHistory />,
      },
      {
        title: "Chat",
        path: "/dashboard/chat",
        icon: <MdOutlineChat />,
      },
    ],
  },
  {
    title: "Charts",
    list: [
      {
        title: "Line Chart",
        path: "/dashboard/charts/reports",
        icon: <FaChartArea />,
      },
      {
        title: "Bar Chart",
        path: "/dashboard/charts/bar",
        icon: <FaChartArea />,
      },
      {
        title: "Pie Chart",
        path: "/dashboard/charts/pie",
        icon: <MdAddChart />,
      },
    ],
  },
]; // Add your menu items here

export function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={styles.userDetail}>
          <span className={styles.username}>Jhon Joe</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {MenuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

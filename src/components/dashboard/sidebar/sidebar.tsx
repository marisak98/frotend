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
import Logo from "@/components/logo";

const MenuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/",
        icon: <MdDashboard />,
      },
      {
        title: "Empleados",
        path: "/employee",
        icon: <FaUsersCog />,
      },
      {
        title: "Ordenes de Produccion",
        path: "/orderList",
        icon: <CiViewList />,
      },
      {
        title: "Planos",
        path: "/blueprint",
        icon: <SiBlueprint />,
      },
      {
        title: "Ordenes de Diseño",
        path: "/orderDesign",
        icon: <MdDesignServices />,
      },
      {
        title: "Detalle de Orden",
        path: "/orderDetail",
        icon: <TbListDetails />,
      },
      {
        title: "Estado de Ordenes",
        path: "/orderTracking",
        icon: <CiDeliveryTruck />,
      },
      {
        title: "Tareas",
        path: "/task",
        icon: <FaTasks />,
      },
      {
        title: "Historial de Trabajo",
        path: "/history",
        icon: <MdWorkHistory />,
      },
      {
        title: "Chat",
        path: "/chat",
        icon: <MdOutlineChat />,
      },
    ],
  },
  {
    title: "Charts",
    list: [
      {
        title: "Line Chart",
        path: "/charts/reports",
        icon: <FaChartArea />,
      },
      {
        title: "Bar Chart",
        path: "/charts/bar",
        icon: <FaChartArea />,
      },
      {
        title: "Pie Chart",
        path: "/charts/pie",
        icon: <MdAddChart />,
      },
    ],
  },
]; // Add your menu items here

function Sidebar() {
  return (
    <>
      <DesktopSidebar />
    </>
  );
}

function DesktopSidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className={styles.userDetail}>
          <span className={styles.username}>Jhon Joe</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>*/}
        <Logo />
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

export default Sidebar;

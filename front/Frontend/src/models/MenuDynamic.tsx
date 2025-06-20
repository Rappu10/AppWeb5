import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icons from "@ant-design/icons";

interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  roles: string[];
}

const menus: MenuItem[] = [
  {
    title: "Usuarios",
    path: "/users",
    icon: "UserOutlined",
    roles: ["65db1f2b4fdafc0312eb7971"],
  },
  {
    title: "Reportes",
    path: "/reports",
    icon: "BarChartOutlined",
    roles: ["65db1f2b4fdafc0312eb7971", "65db1f2b4fdafc0312eb7972"],
  },
];

function MenuDynamic() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de fetch o lógica de roles
    setTimeout(() => {
      setItems(menus);
    }, 500);
  }, []);

  const renderItems = (item: MenuItem) => {
    const IconComponent = item.icon ? (Icons as any)[item.icon] : null;
    return {
      key: item.path,
      icon: IconComponent ? <IconComponent /> : null,
      label: item.title,
      onClick: () => navigate(item.path),
    };
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items.map(renderItems)}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
}

export default MenuDynamic;
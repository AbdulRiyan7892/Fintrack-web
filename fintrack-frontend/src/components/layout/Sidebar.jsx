import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/userApi";

import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PieChart,
  ChartColumn,
  Settings,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Transactions",
    icon: Receipt,
    path: "/transactions",
  },
  {
    title: "Budget",
    icon: Wallet,
    path: "/budget",
  },
  {
    title: "Analytics",
    icon: PieChart,
    path: "/analytics",
  },
  {
    title: "Reports",
    icon: ChartColumn,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const { collapsed } = useSidebar();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div>
        {/* Logo */}
        <div className="sidebar-header">
          {collapsed ? "F" : "FinTrack"}
        </div>

        {/* Menu */}
        <div className="sidebar-menu">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={20} />

                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          {!collapsed && (
            <div>
              <div
                style={{
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {user?.name || "Loading..."}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "#6B7280",
                  marginTop: 2,
                  wordBreak: "break-word",
                }}
              >
                {user?.email || ""}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
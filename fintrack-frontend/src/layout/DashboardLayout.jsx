import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      <Sidebar />

      <div
        style={{
          marginLeft: collapsed ? 74 : 240,
          transition: "margin-left .25s ease",
        }}
      >
        <Navbar />

        <main className="p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
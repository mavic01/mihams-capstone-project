import { useState } from "react";
import DashboardNav from "../components/dashboard/DashboardNav";
import DashboardSidebarPanel from "../components/dashboard/DashboardSidebarPanel";
import DashboardHome from "../components/dashboard/DashboardHome";
import Employees from "./Employees";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#F6F8F8]">
      <DashboardNav />

      <div className="flex flex-col lg:flex-row">
        <DashboardSidebarPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 w-full p-2 lg:p-4">
          {activeTab === "dashboard" && <DashboardHome />}

          {activeTab === "employees" && <Employees />}

          {activeTab === "cards" && (
            <div className="bg-white text-[#013C61] rounded p-10 font-sf font-bold">
              Cards Feature Coming Soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;






import { useState } from "react";
import { AccountSettings } from "./_components/AccountSettings";
import { NotificationSettings } from "./_components/NotificationSettings";



const ClientAdminSettings = () => {
  const [activeTab, setActiveTab] = useState<"Account" | "Notifications">("Account");

  return (
    <div className="p-8  min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>

      <div className="flex gap-10">
        {/* Navigation Sidebar (or Top Tabs) */}
        <div className="w-full">
          <div className="flex gap-8 border-b border-slate-100 mb-10">
            <button
              onClick={() => setActiveTab("Account")}
              className={`pb-4 px-2 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "Account" 
                ? "text-[#8C23CC] border-b-2 border-[#8C23CC]" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Account Settings
            </button>
            <button
              onClick={() => setActiveTab("Notifications")}
              className={`pb-4 px-2 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "Notifications" 
                ? "text-[#8C23CC] border-b-2 border-[#8C23CC]" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Notifications
            </button>
          </div>

          {/* Render Active View */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {activeTab === "Account" ? <AccountSettings /> : <NotificationSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAdminSettings
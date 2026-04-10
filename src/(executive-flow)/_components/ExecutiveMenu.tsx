
// import { BiReceipt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
// import { IoSettingsOutline } from "react-icons/io5";
// import {   LuNotepadText } from "react-icons/lu";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
  isExpanded?: boolean;
}
export const ExecutiveMenuItems: MenuItem[] = [
    {
      id: "Executive/dashboard",
      label: "Dashboard",
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      id: "Executive/dashboard/Scorecard",
      label: "Scorecard",
      icon: <RiLightbulbFlashLine className="w-5 h-5" />,
    },
    {
        id:  "Executive/dashboard/Settings" , 
        label : "Settings" ,
        icon : <FiSettings className="w-5 h-5" />
    }
    
  ];
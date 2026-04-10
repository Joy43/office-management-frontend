
// import { BiReceipt } from "react-icons/bi";
import { FiSettings, FiUsers } from "react-icons/fi";
// import { IoSettingsOutline } from "react-icons/io5";
import { LuFileText, LuLogs } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

interface ManagerMenuItems {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: ManagerMenuItems[];
  isExpanded?: boolean;
}
export const ManagerMenuItems: ManagerMenuItems[] = [
    {
      id: "Manager/dashboard",
      label: "Dashboard",
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      id: "Manager/dashboard/Huddles",
      label: "Huddles",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      id: "Manager/dashboard/Coaching-Logs",
      label: "Coaching Logs",
      icon: <LuLogs className="w-5 h-5" />,
    },
    {
        id:  "Manager/dashboard/Team-Management" , 
        label : "Team Management" ,
        icon : <FiUsers className="w-5 h-5"/>
    },
        {
        id:  "Manager/dashboard/Sessions-Management" , 
        label : "Sessions Management" ,
        icon : <LuFileText className="w-5 h-5"/>
    },
        {
        id:  "Manager/dashboard/Settings" , 
        label : "Settings" ,
        icon : <FiSettings className="w-5 h-5"/>
    }
    
  ];
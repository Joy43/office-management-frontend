
// import { BiReceipt } from "react-icons/bi";
import { FiSettings, FiUsers } from "react-icons/fi";
// import { IoSettingsOutline } from "react-icons/io5";
import {  LuLogs, LuNotepadText } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

interface CoachMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: CoachMenuItem[];
  isExpanded?: boolean;
}
export const CoachMenuItems: CoachMenuItem[] = [
    {
      id: "Coach/dashboard",
      label: "Dashboard",
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      id: "Coach/dashboard/Sessions-Management",
      label: "Sessions Management",
      icon: <LuNotepadText className="w-5 h-5" />,
    },
    {
      id: "Coach/dashboard/Coaching-Logs",
      label: "Coaching Logs",
      icon: <LuLogs className="w-5 h-5" />,
    },
    {
        id:  "Coach/dashboard/Assigned-Team-Members" , 
        label : "Assigned Team Members" ,
        icon : <FiUsers className="w-5 h-5" />
    },
    {
        id:  "Coach/dashboard/Huddles" , 
        label : "Huddles" ,
        icon : <FiUsers className="w-5 h-5" />
    },
    {
        id:  "Coach/dashboard/Settings" , 
        label : "Settings" ,
        icon : <FiSettings className="w-5 h-5" />
    }
    
  ];
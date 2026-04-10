
// import { BiReceipt } from "react-icons/bi";
// import { FaRegLightbulb } from "react-icons/fa";
import { FiSettings, FiUsers } from "react-icons/fi";
// import { IoSettingsOutline } from "react-icons/io5";
import {  LuFlagTriangleRight, LuNotepadText } from "react-icons/lu";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
  isExpanded?: boolean;
}
export const FrontLineMenuItems: MenuItem[] = [
    {
      id: "FrontLine/dashboard",
      label: "Dashboard",
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      id: "FrontLine/dashboard/My-Sessions",
      label: "My Sessions",
      icon: <LuNotepadText className="w-5 h-5" />,
    },
    {
      id: "FrontLine/dashboard/My-Habits",
      label: "My Habits",
      icon: <LuFlagTriangleRight className="w-5 h-5" />,
    },
    {
        id:  "FrontLine/dashboard/My-Scorecard" , 
        label : "My Scorecard" ,
        icon : <RiLightbulbFlashLine className="w-5 h-5" />
    },
    {
        id:  "FrontLine/dashboard/Huddles" , 
        label : "Huddles" ,
        icon : <FiUsers className="w-5 h-5" />
    },
    {
        id:  "FrontLine/dashboard/Settings" , 
        label : "Settings" ,
        icon : <FiSettings className="w-5 h-5" />
    }
    
  ];
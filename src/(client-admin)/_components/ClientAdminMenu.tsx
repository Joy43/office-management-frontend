
// import { BiReceipt } from "react-icons/bi";
import { FiSettings, FiUsers } from "react-icons/fi";
import { GrNotes } from "react-icons/gr";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoPricetagsOutline } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

interface ClientMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: ClientMenuItem[];
  isExpanded?: boolean;
}
export const ClinetAdminMenuItems: ClientMenuItem[] = [
    {
      id: "client-admin/dashboard",
      label: "Dashboard",
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      id: "client-admin/dashboard/Setup-Template",
      label: "Setup Template",
      icon: <LuLayoutTemplate className="w-5 h-5" />,
    },
    {
      id: "client-admin/dashboard/Branches-Management",
      label: "Branches Management",
      icon: <HiOutlineBuildingOffice2 className="w-5 h-5" />,
    },
    {
        id:  "client-admin/dashboard/Users-Management" , 
        label : "Users Management" ,
        icon : <FiUsers className="w-5 h-5" />
    }, 
    {
       id:  "client-admin/dashboard/Invoice-Management" , 
        label : "Invoice Management" ,
        icon : <GrNotes className="w-5 h-5" />
    }, 
    {
       id:  "client-admin/dashboard/Plans-Pricing" , 
        label : "Plans & Pricing" ,
        icon : <IoPricetagsOutline className="w-5 h-5" />
    }, 
    {
       id:  "client-admin/dashboard/Settings" , 
        label : "Settings" ,
        icon : <FiSettings className="w-5 h-5" />
    }
    
  ];

import { BiReceipt } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
// import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutTemplate } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";

interface SuperMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: SuperMenuItem[];
  isExpanded?: boolean;
}
export const SuperAdminMenuItems: SuperMenuItem[] = [
    {
      id: "super-admin/dashboard",
      label: "Dashboard",
      icon: <RxDashboard className="w-5 h-5" />,
    },
    {
      id: "super-admin/dashboard/Manage-Templates",
      label: "Manage Templates",
      icon: <LuLayoutTemplate className="w-5 h-5" />,
    },
    {
      id: "super-admin/dashboard/Billing-Management",
      label: "Billing Management",
      icon: <BiReceipt className="w-5 h-5" />,
      children: [
        {
          id: "super-admin/dashboard/Revenue-Dashboard",
          label: "Revenue Dashboard",
          icon: null,
        },
        {
          id: "super-admin/dashboard/Manage-Subscriptions",
          label: "Manage Subscriptions",
          icon: null,
        },
        {
            id : "super-admin/dashboard/All-Payments" ,
            label: "All Payments" ,
            icon : null
        }
      ],
    },
    {
        id:  "super-admin/dashboard/Settings" , 
        label : "Settings" ,
        icon : <FiSettings className="w-5 h-5" />
    }
    
  ];
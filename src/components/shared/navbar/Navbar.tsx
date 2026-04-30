/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FC } from "react";
import NotificationButton from "../NotificationButton/NotificationButton";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/redux/ReduxStore";
import { logoutUser } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

interface NavbarT {
  title: string;
  subtitle: string;
  notificationCount: number;
  user: {
    name: string;
    role: string;
    profilePic: string;
  };
}

export const Navbar: FC<NavbarT> = ({
  title,
  subtitle,
  notificationCount,
  user,
}) => {
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // --- Logout Function ---
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="w-full">
      <nav className="sticky bg-white border border-gray-200 rounded-[20px] px-6 py-3 shadow-sm flex justify-between items-center font-sans">
        
        {/* Left Side */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-sm hidden md:block text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          
          {/* Notification */}
          <div className="relative">
            <NotificationButton />
          </div>

          {/* Profile Section */}
          <div
            className="flex items-center gap-3 border-l pl-6 border-gray-100 cursor-pointer relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {/* Avatar */}
            <div className="relative w-11 h-11">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover border border-gray-200"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Name */}
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 leading-none">
                  {user.name}
                </span>
                <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 top-14 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-3 z-50">
                
                {/* User Info */}
                <div className="px-4 pb-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.role}
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>
    </div>
  );
};
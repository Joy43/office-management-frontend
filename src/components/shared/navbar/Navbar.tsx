import type { FC } from "react";
import NotificationButton from "../NotificationButton/NotificationButton";

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
  return (
    <div className="w-full">
      <nav className=" sticky   bg-white border border-gray-200 rounded-[20px] px-6 py-3 shadow-sm flex justify-between items-center font-sans">
        {/* Left Side: Text Content */}
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-sm hidden md:block text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <div className="relative">
            {/* <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600 cursor-pointer hover:bg-purple-100 transition-colors">
            <svg 
              width="22" height="22" 
              viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8C23CC] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {notificationCount}
              </span>
            )}
          </div> */}

            <NotificationButton />
          </div>

          {/* User Profile */}

          <div className="flex   items-center gap-3 border-l pl-6 border-gray-100">
            <div className="relative w-11 h-11">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover border border-gray-200"
              />
              {/* Online Status Green Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
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
          </div>
        </div>
      </nav>
    </div>
  );
};

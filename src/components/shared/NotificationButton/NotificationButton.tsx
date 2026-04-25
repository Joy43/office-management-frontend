

import { useAppSelector } from "@/redux/ReduxStore";
import { Bell } from "lucide-react";
import { useRef, useState } from "react";
import NotificationList from "./NotificationList";


const NotificationButton = () => {
    const unread = useAppSelector((state) => state.notifications.unread);
    const isConnected = useAppSelector(
        (state) => state.notifications.isConnected
    );

    const [open, setOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    return (
        <div>
            <div className="relative" ref={notificationRef}>
                <button
                    onClick={() => setOpen((p) => !p)}
                    className="relative text-gray-600 hover:text-gray-900 p-1 transition-colors cursor-pointer"
                >
                    <Bell className="w-5 h-5" />
                    {unread > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                            {unread > 9 ? "9+" : unread}
                        </span>
                    )}
                    {/* Connection indicator */}
                    <span
                        className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${isConnected ? "bg-green-500" : "bg-gray-400"
                            }`}
                        title={isConnected ? "Connected" : "Disconnected"}
                    />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 z-50">
                        <NotificationList onClose={() => setOpen(false)} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default NotificationButton
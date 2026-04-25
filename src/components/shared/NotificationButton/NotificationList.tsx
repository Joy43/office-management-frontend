
// import { deleteNotification, markAllRead, markAsRead } from "@/redux/features/notification/notification.slice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteNotification, markAllRead, markAsRead } from "@/redux/features/notification/notification.slice";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxStore";
import { Bell, Check, Megaphone, Trash2, User, Wrench, X } from "lucide-react";

type Props = {
    onClose: () => void;
};

const NotificationList = ({ onClose }: Props) => {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state) => state.notifications.list);

    // const [markAsReadApi] = useMarkNotificationAsReadMutation();
    // const [markAllAsReadApi] = useMarkAllNotificationsAsReadMutation();
    // const [deleteNotificationApi] = useDeleteNotificationMutation();

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            // Optimistic update
            dispatch(markAsRead(notificationId));
            // API call
            // await markAsReadApi(notificationId).unwrap();
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            // Optimistic update
            dispatch(markAllRead());
            // API call
            // await markAllAsReadApi().unwrap();
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const handleDelete = async (notificationId: string) => {
        try {
            // Optimistic update
            dispatch(deleteNotification(notificationId));
            // API call
            // await deleteNotificationApi(notificationId).unwrap();
        } catch (error) {
            console.error("Failed to delete notification:", error);
        }
    };

    const formatTimeAgo = (date: string) => {
        const now = new Date();
        const notifDate = new Date(date);
        const diffMs = now.getTime() - notifDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    };

    const getNotificationIcon = (type: string) => {
        const iconClass = "w-5 h-5 text-[#BD001F]";
        switch (type) {
            case "user.create":
                return <User className={iconClass} />;
            case "finance.summary.generated":
                return <Wrench className={iconClass} />;
            case "document.approval":
                return <Wrench className={iconClass} />;
            case "project.assignment":
                return <Wrench className={iconClass} />;
            default:
                return <Megaphone className={iconClass} />;
        }
    };

    return (
        <div className="sm:w-96 bg-white shadow-xl rounded-md max-h-105 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b sticky top-0 bg-white z-10">
                <h4 className="font-semibold text-sm">Notifications</h4>

                <div className="flex items-center gap-2">
                    {notifications.some((n) => !n.read) && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                        >
                            Mark all read
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Body */}
            {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No notifications yet</p>
                </div>
            ) : (
                <div>
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className={`px-4 py-3 border-b hover:bg-gray-50 transition-colors ${!n.read ? "bg-blue-50" : ""
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
                                    {getNotificationIcon(n.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            {n.title}
                                        </p>

                                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                            {formatTimeAgo(n.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-0.5">{n.message}</p>

                                    {/* Meta info */}
                                    {n.meta && Object.keys(n.meta).length > 0 && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            {n.meta.name && (
                                                <span className="inline-flex items-center gap-1 mr-2">
                                                    <User className="w-3 h-3" />
                                                    {n.meta.name}
                                                </span>
                                            )}
                                            {n.meta.role && (
                                                <span className="inline-block px-2 py-1 bg-gray-200 rounded">
                                                    {n.meta.role}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 mt-2">
                                        {!n.read && (
                                            <button
                                                onClick={() => handleMarkAsRead(n.notificationId)}
                                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                            >
                                                <Check className="w-3 h-3" />
                                                Mark read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(n.notificationId)}
                                            className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationList;
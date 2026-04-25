
"use client";
import { useGetUserNotificationsQuery } from "@/redux/features/notification/notification.api";
import { useAppDispatch } from "@/redux/ReduxStore";
// import { useGetUserNotificationsQuery } from "@/redux/features/notification/notification.api";
import { setNotifications } from "@/redux/features/notification/notification.slice";
// import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
// import { useAppDispatch } from "@/redux/hook";
// import { useGetUserNotificationsQuery } from "@/redux/features/notification/notificationApi";
// import {
//   connectNotificationSocket,
//   disconnectNotificationSocket,
// } from "@/socket/notificationSocket";
// import { setNotifications } from "@/redux/features/notification/notificationSlice";

export const useNotificationSocket = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, refetch } = useGetUserNotificationsQuery()   
    // Load initial notifications
    useEffect(() => {
        if (data?.data?.notifications) {
            const notifications = data.data.notifications.map((n) => ({
                id: n.id,
                notificationId: n.notificationId,
                type: n.type,
                title: n.title,
                message: n.message,
                createdAt: n.createdAt,
                read: n.read,
                meta: n.metadata,
            }));
            dispatch(setNotifications(notifications));
        }
    }, [data, dispatch]);

    return { isLoading, refetch };
};
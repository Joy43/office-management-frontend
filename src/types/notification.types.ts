/* eslint-disable @typescript-eslint/no-explicit-any */
export type NotificationType =
    | "user.create"
    | "service.create";

export interface INotification {
    type: NotificationType;
    title: string;
    message: string;
    createdAt: string;
    meta: Record<string, any>;
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    notifications: Array<{
      id: string;
      notificationId: string;
      type: string;
      read: boolean;
      createdAt: string;
      updatedAt: string;
      title: string;
      message: string;
      entityId: string;
      metadata: any;
      notificationCreatedAt: string;
    }>;
    unreadCount: number;
    total: number;
  };
}
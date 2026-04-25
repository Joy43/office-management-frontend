import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface NotificationMeta {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
}

export interface Notification {
  id: string;
  notificationId: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  meta?: NotificationMeta;
}

export interface NotificationState {
  list: Notification[];
  unread: number;
  isConnected: boolean;
}

const initialState: NotificationState = {
  list: [],
  unread: 0,
  isConnected: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
      state.unread = action.payload.filter((n) => !n.read).length;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.unshift(action.payload);
      if (!action.payload.read) {
        state.unread += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.list.find(
        (n) => n.notificationId === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unread = Math.max(0, state.unread - 1);
      }
    },
    markAllRead: (state) => {
      state.list.forEach((n) => (n.read = true));
      state.unread = 0;
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notification = state.list.find(
        (n) => n.notificationId === action.payload
      );
      if (notification && !notification.read) {
        state.unread = Math.max(0, state.unread - 1);
      }
      state.list = state.list.filter(
        (n) => n.notificationId !== action.payload
      );
    },
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    clearNotifications: (state) => {
      state.list = [];
      state.unread = 0;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markAllRead,
  deleteNotification,
  setSocketConnected,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
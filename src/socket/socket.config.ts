/* eslint-disable @typescript-eslint/no-explicit-any */
export type TNamespace = "/" | "/live-support" | "/notifications" | "/activity";

export interface ISocketNamespaceConfig {
  requiresAuth: boolean;

  //connection options
  autoConnect?: boolean;
  transports?: ("polling" | "websocket")[];

  //reconnection
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;

  query?: Record<string, any>;
  extraHeaders?: Record<string, string>;
}

export const SOCKET_NAMESPACES_CONFIG: Record<
  TNamespace,
  ISocketNamespaceConfig
> = {
  "/": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },

  "/live-support": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },
  "/notifications": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },
  "/activity": {
    requiresAuth: true,
    autoConnect: false,
    transports: ["websocket"],
    reconnection: true,
  },
};

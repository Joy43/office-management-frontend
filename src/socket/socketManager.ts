// import { disconnectSocket, getSocket } from "@/socket/config/socket";
// import { TNamespace } from "@/socket/config/socket.config";

import { disconnectSocket, getSocket } from "./socket";
import type { TNamespace } from "./socket.config";

// safe connect
export const connectNamespace = async (ns: TNamespace) => {
  const socket = await getSocket(ns);

  if (socket.connected) {
    return socket;
  }

  socket.connect();

  console.log(socket, "socket after connection========>");
  return socket;
};

export const disconnectNamespace = (ns: TNamespace) => {
  disconnectSocket(ns);
};

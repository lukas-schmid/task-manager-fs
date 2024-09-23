export const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4001/api"
    : process.env.BACKEND_URL;

export const socketUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4001"
    : process.env.NEXT_PUBLIC_SOCKET_URL;

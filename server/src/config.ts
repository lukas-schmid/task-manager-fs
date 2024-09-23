export const jwtSecret = process.env.JWT_SECRET || "secret";

export const mongoUri =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/taskmanager"
    : (process.env.MONGO_URI ?? "");

export const port = process.env.PORT || 4001;

export const backendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4001/api"
    : process.env.BACKEND_URL;

export const clientUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.CLIENT_URL;

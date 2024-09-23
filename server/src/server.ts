import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Socket } from "./types/socket.interface";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as usersController from "./controllers/users";
import * as boardsController from "./controllers/boards";
import * as columnsController from "./controllers/columns";
import * as tasksController from "./controllers/tasks";
import bodyParser from "body-parser";
import authMiddleware from "./middlewares/auth.middleware";
import cors from "cors";
import { SocketEventsEnum } from "./types/socketEvents.enum";
import User from "./models/user";
import { errorMiddleware } from "./middlewares/error.middleware";
import { CustomError } from "./utils/CustomError";
import { ErrorCodes } from "./types/errorCodes.enum";

import { jwtSecret, mongoUri, port } from "./config";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("toJSON", {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
  },
});

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Service is running",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/users", usersController.register);
app.post("/api/users/login", usersController.login);
app.get("/api/user", authMiddleware, usersController.currentUser);
app.get("/api/boards", authMiddleware, boardsController.getBoards);
app.get("/api/boards/:boardId", authMiddleware, boardsController.getBoard);
app.get(
  "/api/boards/:boardId/columns",
  authMiddleware,
  columnsController.getColumns,
);
app.get("/api/boards/:boardId/tasks", authMiddleware, tasksController.getTasks);
app.post("/api/boards", authMiddleware, boardsController.createBoard);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError("Not Found", ErrorCodes.notFound, 404);
  next(error);
});

io.use(async (socket: Socket, next) => {
  try {
    const token = (socket.handshake.auth.token as string) ?? "";
    const data = jwt.verify(token.split(" ")[1], jwtSecret) as {
      id: string;
      email: string;
    };
    const user = await User.findById(data.id);

    if (!user) {
      return next(new Error("Authentication error"));
    }
    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  socket.on(SocketEventsEnum.boardsJoin, (data) => {
    boardsController.joinBoard(io, socket, data);
  });
  socket.on(SocketEventsEnum.boardsLeave, (data) => {
    boardsController.leaveBoard(io, socket, data);
  });
  socket.on(SocketEventsEnum.boardsUpdate, (data) => {
    boardsController.updateBoard(io, socket, data);
  });
  socket.on(SocketEventsEnum.boardsDelete, (data) => {
    boardsController.deleteBoard(io, socket, data);
  });
  socket.on(SocketEventsEnum.columnsCreate, (data) => {
    columnsController.createColumn(io, socket, data);
  });
  socket.on(SocketEventsEnum.columnsUpdate, (data) => {
    columnsController.updateColumn(io, socket, data);
  });
  socket.on(SocketEventsEnum.columnsDelete, (data) => {
    columnsController.deleteColumn(io, socket, data);
  });
  socket.on(SocketEventsEnum.tasksCreate, (data) => {
    tasksController.createTask(io, socket, data);
  });
  socket.on(SocketEventsEnum.tasksUpdate, (data) => {
    tasksController.updateTask(io, socket, data);
  });
  socket.on(SocketEventsEnum.tasksDelete, (data) => {
    tasksController.deleteTask(io, socket, data);
  });
});

app.use(errorMiddleware);

mongoose.connect(mongoUri).then(() => {
  console.log("connected to MongoDB");
  httpServer.listen(port, () => {
    console.log(`API is listening on port ${port}`);
  });
});

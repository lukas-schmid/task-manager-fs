import mongoose from "mongoose";
import request from "supertest";
import app from "../server";

describe("Boards Controller", () => {
  let token: string;
  let boardId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);

    await mongoose.connection.db
      .collection("users")
      .deleteOne({ email: "test@example.com" });

    await request(app).post("/api/users").send({
      email: "test@example.com",
      username: "test user",
      password: "password123",
    });

    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = res.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should fetch all boards for the authenticated user", async () => {
    const res = await request(app)
      .get("/api/boards")
      .set("Authorization", token);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a new board", async () => {
    const res = await request(app)
      .post("/api/boards")
      .set("Authorization", token)
      .send({
        title: "Test Board",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title", "Test Board");
    expect(res.body).toHaveProperty("userId");

    boardId = res.body.id;
  });

  it("should fetch a single board by ID", async () => {
    const res = await request(app)
      .get(`/api/boards/${boardId}`)
      .set("Authorization", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", boardId);
    expect(res.body).toHaveProperty("title", "Test Board");
  });

  it("should return 404 when a board is not found", async () => {
    const fakeBoardId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/boards/${fakeBoardId}`)
      .set("Authorization", token);

    expect(res.statusCode).toEqual(404);
  });
});

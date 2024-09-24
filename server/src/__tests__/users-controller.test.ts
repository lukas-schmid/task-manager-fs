import mongoose from "mongoose";
import request from "supertest";
import app from "../server";

describe("Users Controller", () => {
  let token: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    await mongoose.connection.db
      .collection("users")
      .deleteOne({ email: "test@example.com" });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/api/users").send({
      email: "test@example.com",
      username: "test user",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token;
  });

  it("should return the current user", async () => {
    const res = await request(app).get("/api/user").set("Authorization", token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "test@example.com");
  });
});

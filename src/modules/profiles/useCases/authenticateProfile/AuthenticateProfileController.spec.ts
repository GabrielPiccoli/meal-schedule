import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Authenticate Profile Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO profiles(id, name, email, password, username)
      VALUES('${id}', 'Gabriel Piccoli', 'gabriel.pdmarcos@gmail.com', '${password}', 'admin')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to authenticate a profile", async () => {
    const response = await request(app).post("/sessions").send({
      username: "admin",
      password: "admin",
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should not be able to authenticate a non exists profile", async () => {
    const response = await request(app).post("/sessions").send({
      username: "teste",
      password: "admin",
    });

    expect(response.status).toBe(400);
  });

  it("should not be able to authenticate a profile with wrong password", async () => {
    const response = await request(app).post("/sessions").send({
      username: "admin",
      password: "123",
    });

    expect(response.status).toBe(400);
  });
});

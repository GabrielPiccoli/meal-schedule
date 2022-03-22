import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Delete Profile Controller", () => {
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

  it("should be able to delete a profile", async () => {
    const responseToken = await request(app).post("/sessions").send({
      username: "admin",
      password: "admin",
    });
    const { token } = responseToken.body;
    const { body } = await request(app)
      .post("/profiles")
      .send({
        email: "desenvolvimento03@tbrweb.com.br",
        name: "Gabriel Piccoli",
        password: "@@123abc",
        username: "admin",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .delete(`/profiles/${body.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(204);
  });

  it("should be not able to delete a non exists profile", async () => {
    const responseToken = await request(app).post("/sessions").send({
      username: "admin",
      password: "admin",
    });
    const { token } = responseToken.body;
    const response = await request(app)
      .delete("/profiles/1234")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});

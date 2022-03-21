import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Update Profiles Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO profiles(id, name, email, user, password)
       VALUES('${id}', 'Suporte TBrWeb', 'suporte@tbrweb.com.br', 'balaminut', '${password}')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to update a profile", async () => {
    const responseToken = await request(app).post("/sessions").send({
      user: "balaminut",
      password: "admin",
    });
    const { token } = responseToken.body;

    const { body } = await request(app)
      .post("/profiles")
      .send({
        email: "desenvolvimento03@tbrweb.com.br",
        name: "Gabriel Piccoli",
        password: "@@123abc",
        user: "admin",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .put(`/profiles/${body.id}`)
      .send({
        email: "desenvolvimento03@tbrweb.com.br",
        name: "Gabriel Piccoli Updated",
        password: "@@123abc",
        user: "admin",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body.name).toEqual("Gabriel Piccoli Updated");
  });

  it("should not be able to update a non exists profile", async () => {
    const responseToken = await request(app).post("/sessions").send({
      user: "balaminut",
      password: "admin",
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .put("/profiles/12345")
      .send({
        email: "desenvolvimento03@tbrweb.com.br",
        name: "Gabriel Piccoli Updated",
        password: "@@123abc",
        user: "admin",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
});

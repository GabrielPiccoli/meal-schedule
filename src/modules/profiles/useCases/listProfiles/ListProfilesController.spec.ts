import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Profiles Controller", () => {
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

  it("should be able to list all profiles", async () => {
    const responseToken = await request(app).post("/sessions").send({
      user: "balaminut",
      password: "admin",
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .get("/profiles")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body.length).toBe(1);
  });
});

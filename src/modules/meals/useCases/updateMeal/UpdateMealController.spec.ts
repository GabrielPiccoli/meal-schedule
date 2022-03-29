import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Update Meal Controller", () => {
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

  it("should be able to update a meal", async () => {
    const responseToken = await request(app).post("/sessions").send({
      username: "admin",
      password: "admin",
    });
    const { token } = responseToken.body;
    const { body } = await request(app)
      .post("/meals")
      .send({
        description: "Test",
        meal_date: "2022-03-30",
        period: "breakfast",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .put(`/meals/${body.id}`)
      .send({
        description: "Test updated",
        meal_date: "2022-03-30",
        period: "breakfast",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.body.description).toBe("Test updated");
  });
});

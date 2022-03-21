import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Update SEO Controller", () => {
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

  it("should be able to update a SEO", async () => {
    const responseToken = await request(app).post("/sessions").send({
      user: "balaminut",
      password: "admin",
    });
    const { token } = responseToken.body;
    await request(app)
      .post("/seo")
      .send({
        title: "Title Test",
        description: "Description Test",
        keywords: "Keywords Test",
        author: "Author Test",
        fbpixel_code: "Pixel Code Test",
        ga_code: "Analytics Code Test",
        schema_twitter: "Link Twitter",
        schema_facebook: "Link Facebook",
        schema_linkedin: "Link Linkedin",
        schema_instagram: "Link Instagram",
        schema_street: "Schema Street",
        schema_region: "Schema Region",
        schema_cep: "Schema CEP",
        schema_country: "Schema Country",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const { body } = await request(app)
      .put("/seo")
      .send({
        title: "Title Test Updated",
        description: "Description Test Updated",
        keywords: "Keywords Test Updated",
        author: "Author Test Updated",
        fbpixel_code: "Pixel Code Test Updated",
        ga_code: "Analytics Code Test Updated",
        schema_twitter: "Link Twitter Updated",
        schema_facebook: "Link Facebook Updated",
        schema_linkedin: "Link Linkedin Updated",
        schema_instagram: "Link Instagram Updated",
        schema_street: "Schema Street Updated",
        schema_region: "Schema Region Updated",
        schema_cep: "Schema CEP Updated",
        schema_country: "Schema Country Updated",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(body.title).toEqual("Title Test Updated");
  });
});

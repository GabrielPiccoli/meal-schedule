import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSEO1647863581910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "seo",
        columns: [
          {
            name: "id",
            type: "varchar(255)",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar(255)",
          },
          {
            name: "description",
            type: "varchar(255)",
          },
          {
            name: "keywords",
            type: "varchar(255)",
          },
          {
            name: "author",
            type: "varchar(255)",
          },
          {
            name: "fbpixel_code",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "ga_code",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "schema_twitter",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "schema_facebook",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "schema_linkedin",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "schema_instagram",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            name: "schema_street",
            type: "varchar(255)",
          },
          {
            name: "schema_region",
            type: "varchar(255)",
          },
          {
            name: "schema_cep",
            type: "varchar(255)",
          },
          {
            name: "schema_country",
            type: "varchar(255)",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("seo");
  }
}

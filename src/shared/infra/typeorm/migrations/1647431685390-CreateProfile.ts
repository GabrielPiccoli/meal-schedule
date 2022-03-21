import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfile1647431685390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profiles",
        columns: [
          {
            name: "id",
            type: "varchar(255)",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar(255)",
          },
          {
            name: "email",
            type: "varchar(255)",
          },
          {
            name: "user",
            type: "varchar(20)",
          },
          {
            name: "password",
            type: "varchar(100)",
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
    await queryRunner.dropTable("profiles");
  }
}

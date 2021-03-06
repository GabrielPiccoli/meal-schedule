import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProfilesToken1647440729846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "profiles_token",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "refresh_token",
            type: "varchar",
          },
          {
            name: "profile_id",
            type: "uuid",
          },
          {
            name: "expires_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKProfileToken",
            referencedTableName: "profiles",
            referencedColumnNames: ["id"],
            columnNames: ["profile_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("profiles_token");
  }
}

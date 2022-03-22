import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeal1647909884655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "meals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "profile_id",
            type: "uuid",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "meal_date",
            type: "timestamp",
          },
          {
            name: "period",
            type: "enum",
            enum: ["breakfast", "lunch", "dinner"],
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
        foreignKeys: [
          {
            name: "FKMealProfile",
            columnNames: ["profile_id"],
            referencedTableName: "profiles",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("meals");
  }
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { MealPeriod } from "@modules/meals/dtos/MealPeriod";

@Entity("meals")
class Meal {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  meal_date: Date;

  @Column({ type: "enum", enum: MealPeriod })
  period: MealPeriod;

  @Column()
  profile_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Meal };

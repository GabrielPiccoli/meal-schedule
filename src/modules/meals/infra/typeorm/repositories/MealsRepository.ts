import { getRepository, Repository } from "typeorm";

import { ICreateMealDTO } from "@modules/meals/dtos/ICreateMealDTO";
import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";

import { Meal } from "../entities/Meal";

class MealsRepository implements IMealsRepository {
  private repository: Repository<Meal>;

  constructor() {
    this.repository = getRepository(Meal);
  }

  async create({
    description,
    meal_date,
    period,
    profile_id,
    id,
  }: ICreateMealDTO): Promise<Meal> {
    const meal = this.repository.create({
      description,
      meal_date,
      period,
      profile_id,
      id,
    });

    await this.repository.save(meal);

    return meal;
  }

  async list(profile_id: string): Promise<Meal[]> {
    const all = await this.repository.find({ profile_id });
    return all;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Meal> {
    const meal = await this.repository.findOne(id);
    return meal;
  }

  async findByDatePeriodAndProfile(
    meal_date: Date,
    period: MealPeriod,
    profile_id: string
  ): Promise<Meal> {
    const meal = await this.repository.findOne({
      where: { meal_date, period, profile_id },
    });
    return meal;
  }
}

export { MealsRepository };

import { ICreateMealDTO } from "@modules/meals/dtos/ICreateMealDTO";
import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { Meal } from "@modules/meals/infra/typeorm/entities/Meal";

import { IMealsRepository } from "../IMealsRepository";

class MealsRepositoryInMemory implements IMealsRepository {
  meals: Meal[] = [];

  async create({
    description,
    meal_date,
    period,
    profile_id,
  }: ICreateMealDTO): Promise<Meal> {
    const meal = new Meal();

    Object.assign(meal, {
      description,
      meal_date,
      period,
      profile_id,
    });

    this.meals.push(meal);

    return meal;
  }

  async list(profile_id: string): Promise<Meal[]> {
    const all = this.meals.filter((m) => m.profile_id === profile_id);
    return all;
  }

  async listByPeriod(period: MealPeriod, profile_id: string): Promise<Meal[]> {
    const all = this.meals.filter(
      (m) => m.profile_id === profile_id && m.period === period
    );
    return all;
  }

  async deleteById(id: string): Promise<void> {
    const meal = await this.findById(id);
    const indexOfMeal = this.meals.indexOf(meal);
    this.meals.splice(indexOfMeal, 1);
  }

  async findById(id: string): Promise<Meal> {
    const meal = this.meals.find((m) => m.id === id);
    return meal;
  }

  async findByDatePeriodAndProfile(
    meal_date: Date,
    period: MealPeriod,
    profile_id: string
  ): Promise<Meal> {
    const meal = this.meals.find(
      (m) =>
        m.meal_date === meal_date &&
        m.period === period &&
        m.profile_id === profile_id
    );
    return meal;
  }
}

export { MealsRepositoryInMemory };

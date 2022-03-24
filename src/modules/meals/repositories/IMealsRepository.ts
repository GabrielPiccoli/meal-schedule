import { ICreateMealDTO } from "../dtos/ICreateMealDTO";
import { MealPeriod } from "../dtos/MealPeriod";
import { Meal } from "../infra/typeorm/entities/Meal";

interface IMealsRepository {
  create(data: ICreateMealDTO): Promise<Meal>;
  list(profile_id: string): Promise<Meal[]>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Meal>;
  findByDatePeriodAndProfile(
    meal_date: Date,
    period: MealPeriod,
    profile_id: string
  ): Promise<Meal>;
}

export { IMealsRepository };

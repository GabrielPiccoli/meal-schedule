import { MealPeriod } from "./MealPeriod";

interface ICreateMealDTO {
  id?: string;
  description: string;
  meal_date: Date;
  period: MealPeriod;
  profile_id: string;
}

export { ICreateMealDTO };

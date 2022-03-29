import { inject, injectable } from "tsyringe";

import { MealPeriod } from "@modules/meals/dtos/MealPeriod";
import { Meal } from "@modules/meals/infra/typeorm/entities/Meal";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListMealsByPeriodUseCase {
  constructor(
    @inject("MealsRepository")
    private mealsRepository: IMealsRepository
  ) {}

  async execute(period: MealPeriod, profile_id: string): Promise<Meal[]> {
    if (!Object.values(MealPeriod).includes(period)) {
      throw new AppError(`${period} is not a valid period`);
    }

    const allMeals = await this.mealsRepository.listByPeriod(
      period,
      profile_id
    );

    return allMeals;
  }
}

export { ListMealsByPeriodUseCase };

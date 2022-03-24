import { inject, injectable } from "tsyringe";

import { ICreateMealDTO } from "@modules/meals/dtos/ICreateMealDTO";
import { Meal } from "@modules/meals/infra/typeorm/entities/Meal";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateMealUseCase {
  constructor(
    @inject("MealsRepository")
    private mealsRepository: IMealsRepository
  ) {}

  async execute({
    description,
    meal_date,
    period,
    profile_id,
  }: ICreateMealDTO): Promise<Meal> {
    const mealAlreadyExists =
      await this.mealsRepository.findByDatePeriodAndProfile(
        meal_date,
        period,
        profile_id
      );

    if (mealAlreadyExists) {
      throw new AppError("A meal already exists in the same day and period");
    }

    const meal = await this.mealsRepository.create({
      description,
      meal_date,
      period,
      profile_id,
    });

    return meal;
  }
}

export { CreateMealUseCase };

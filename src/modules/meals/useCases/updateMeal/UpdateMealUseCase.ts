import { inject, injectable } from "tsyringe";

import { ICreateMealDTO } from "@modules/meals/dtos/ICreateMealDTO";
import { Meal } from "@modules/meals/infra/typeorm/entities/Meal";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateMealUseCase {
  constructor(
    @inject("MealsRepository")
    private mealsRepository: IMealsRepository
  ) {}

  async execute({
    description,
    meal_date,
    period,
    profile_id,
    id,
  }: ICreateMealDTO): Promise<Meal> {
    const mealExists = await this.mealsRepository.findById(id);

    if (!mealExists) {
      throw new AppError("The meal does not exists");
    }

    const mealConflictDateAndPeriod =
      await this.mealsRepository.findByDatePeriodAndProfile(
        meal_date,
        period,
        profile_id
      );

    if (mealConflictDateAndPeriod && id !== mealConflictDateAndPeriod.id) {
      throw new AppError("A meal already exists in the same day and period");
    }

    const meal = await this.mealsRepository.create({
      description,
      meal_date,
      period,
      profile_id,
      id,
    });

    return meal;
  }
}

export { UpdateMealUseCase };

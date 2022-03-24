import { inject, injectable } from "tsyringe";

import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteMealUseCase {
  constructor(
    @inject("MealsRepository")
    private mealsRepository: IMealsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const mealExists = await this.mealsRepository.findById(id);

    if (!mealExists) {
      throw new AppError("The meal does not exists");
    }

    await this.mealsRepository.deleteById(id);
  }
}

export { DeleteMealUseCase };

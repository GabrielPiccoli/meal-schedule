import { inject, injectable } from "tsyringe";

import { Meal } from "@modules/meals/infra/typeorm/entities/Meal";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";

@injectable()
class ListMealUseCase {
  constructor(
    @inject("MealsRepository")
    private mealsRepository: IMealsRepository
  ) {}

  async execute(profile_id: string): Promise<Meal[]> {
    const all = await this.mealsRepository.list(profile_id);
    return all;
  }
}

export { ListMealUseCase };

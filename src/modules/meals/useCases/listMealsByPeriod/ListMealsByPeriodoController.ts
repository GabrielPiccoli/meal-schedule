import { Request, Response } from "express";
import { container } from "tsyringe";

import { MealPeriod } from "@modules/meals/dtos/MealPeriod";

import { ListMealsByPeriodUseCase } from "./ListMealsByPeriodUseCase";

class ListMealsByPeriodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: profile_id } = req.profile;
    const { period } = req.params;
    const listMealsByPeriodUseCase = container.resolve(
      ListMealsByPeriodUseCase
    );
    const periodConverted = period as MealPeriod;
    const allMeals = await listMealsByPeriodUseCase.execute(
      periodConverted,
      profile_id
    );

    return res.json(allMeals);
  }
}

export { ListMealsByPeriodController };

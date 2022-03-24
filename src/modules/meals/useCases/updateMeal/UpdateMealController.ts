import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateMealUseCase } from "./UpdateMealUseCase";

class UpdateMealController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: profile_id } = req.profile;
    const { id } = req.params;
    const { description, meal_date, period } = req.body;
    const updateMealUseCase = container.resolve(UpdateMealUseCase);
    const meal = await updateMealUseCase.execute({
      id,
      description,
      meal_date,
      period,
      profile_id,
    });

    return res.json(meal);
  }
}

export { UpdateMealController };

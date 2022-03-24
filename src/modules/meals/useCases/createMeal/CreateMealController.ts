import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMealUseCase } from "./CreateMealUseCase";

class CreateMealController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: profile_id } = req.profile;
    const { description, meal_date, period } = req.body;
    const createMealUseCase = container.resolve(CreateMealUseCase);
    const meal = await createMealUseCase.execute({
      description,
      meal_date,
      period,
      profile_id,
    });

    return res.status(201).json(meal);
  }
}

export { CreateMealController };

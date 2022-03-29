import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMealsUseCase } from "./ListMealsUseCase";

class ListMealsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: profile_id } = req.profile;
    const listMealsUseCase = container.resolve(ListMealsUseCase);
    const all = await listMealsUseCase.execute(profile_id);

    return res.json(all);
  }
}

export { ListMealsController };

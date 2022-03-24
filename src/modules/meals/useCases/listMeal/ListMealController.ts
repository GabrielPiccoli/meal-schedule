import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMealUseCase } from "./ListMealUseCase";

class ListMealController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: profile_id } = req.profile;
    const listMealUseCase = container.resolve(ListMealUseCase);
    const all = await listMealUseCase.execute(profile_id);

    return res.json(all);
  }
}

export { ListMealController };

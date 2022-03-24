import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteMealUseCase } from "./DeleteMealUseCase";

class DeleteMealController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteMealUseCase = container.resolve(DeleteMealUseCase);

    await deleteMealUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeleteMealController };

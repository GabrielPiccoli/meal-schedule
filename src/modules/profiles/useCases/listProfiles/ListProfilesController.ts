import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProfilesUseCase } from "./ListProfilesUseCase";

class ListProfilesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listProfilesUseCase = container.resolve(ListProfilesUseCase);
    const profiles = await listProfilesUseCase.execute();

    return res.json(profiles);
  }
}

export { ListProfilesController };

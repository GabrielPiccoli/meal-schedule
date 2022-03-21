import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetProfileUseCase } from "./GetProfileUseCase";

class GetProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.profile;
    const getProfileUseCase = container.resolve(GetProfileUseCase);
    const profile = await getProfileUseCase.execute(id);

    return res.json(profile);
  }
}

export { GetProfileController };

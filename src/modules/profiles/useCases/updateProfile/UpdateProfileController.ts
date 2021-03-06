import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

class UpdateProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);
    const { id } = req.params;
    const { email, name, password, username } = req.body;
    const profile = await updateProfileUseCase.execute({
      id,
      email,
      name,
      password,
      username,
    });

    return res.json(profile);
  }
}

export { UpdateProfileController };

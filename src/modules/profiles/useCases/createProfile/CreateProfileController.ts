import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProfileUseCase } from "./CreateProfileUseCase";

class CreateProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createProfileUseCase = container.resolve(CreateProfileUseCase);
    const { email, name, password, username } = req.body;
    const profile = await createProfileUseCase.execute({
      email,
      name,
      password,
      username,
    });

    return res.status(201).json(profile);
  }
}

export { CreateProfileController };

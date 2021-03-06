import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateProfileUseCase } from "./AuthenticateProfileUseCase";

class AuthenticateProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, username } = req.body;
    const authenticateProfileUseCase = container.resolve(
      AuthenticateProfileUseCase
    );
    const token = await authenticateProfileUseCase.execute({
      password,
      username,
    });

    return res.json(token);
  }
}

export { AuthenticateProfileController };

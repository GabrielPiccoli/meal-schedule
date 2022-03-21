import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProfileUseCase } from "./DeleteProfileUseCase";

class DeleteProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProfileUseCase = container.resolve(DeleteProfileUseCase);

    await deleteProfileUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeleteProfileController };

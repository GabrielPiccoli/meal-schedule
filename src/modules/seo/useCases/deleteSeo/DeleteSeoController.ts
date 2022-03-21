import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteSeoUseCase } from "./DeleteSeoUseCase";

class DeleteSeoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const deleteSeoUseCase = container.resolve(DeleteSeoUseCase);

    await deleteSeoUseCase.execute();

    return res.status(204).send();
  }
}

export { DeleteSeoController };

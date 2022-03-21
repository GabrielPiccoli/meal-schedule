import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetSeoUseCase } from "./GetSeoUseCase";

class GetSeoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getSeoUseCase = container.resolve(GetSeoUseCase);
    const seo = await getSeoUseCase.execute();

    return res.json(seo);
  }
}

export { GetSeoController };

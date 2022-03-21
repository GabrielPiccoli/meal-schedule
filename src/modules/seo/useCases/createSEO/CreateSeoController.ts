import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSeoUseCase } from "./CreateSeoUseCase";

class CreateSeoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      title,
      description,
      keywords,
      author,
      fbpixel_code,
      ga_code,
      schema_twitter,
      schema_facebook,
      schema_linkedin,
      schema_instagram,
      schema_street,
      schema_region,
      schema_cep,
      schema_country,
    } = req.body;
    const createSeoUseCase = container.resolve(CreateSeoUseCase);
    const seo = await createSeoUseCase.execute({
      title,
      description,
      keywords,
      author,
      fbpixel_code,
      ga_code,
      schema_twitter,
      schema_facebook,
      schema_linkedin,
      schema_instagram,
      schema_street,
      schema_region,
      schema_cep,
      schema_country,
    });

    return res.status(201).json(seo);
  }
}

export { CreateSeoController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSeoUseCase } from "./UpdateSeoUseCase";

class UpdateSeoController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateSeoUseCase = container.resolve(UpdateSeoUseCase);
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
    const seo = await updateSeoUseCase.execute({
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

    return res.json(seo);
  }
}

export { UpdateSeoController };

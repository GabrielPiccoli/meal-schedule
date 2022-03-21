import { inject, injectable } from "tsyringe";

import { ICreateSeoDTO } from "@modules/seo/dtos/ICreateSeoDTO";
import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateSeoUseCase {
  constructor(
    @inject("SeoRepository")
    private seoRepository: ISeoRepository
  ) {}

  async execute({
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
  }: ICreateSeoDTO) {
    const seoExists = await this.seoRepository.getSeo();

    if (!seoExists) {
      throw new AppError("The SEO does not exists");
    }

    const seo = await this.seoRepository.create({
      id: seoExists.id,
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

    return seo;
  }
}

export { UpdateSeoUseCase };

import { inject, injectable } from "tsyringe";

import { SEO } from "@modules/seo/infra/typeorm/entities/SEO";
import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";

@injectable()
class GetSeoUseCase {
  constructor(
    @inject("SeoRepository")
    private seoRepository: ISeoRepository
  ) {}

  async execute(): Promise<SEO> {
    const seo = await this.seoRepository.getSeo();

    return seo;
  }
}

export { GetSeoUseCase };

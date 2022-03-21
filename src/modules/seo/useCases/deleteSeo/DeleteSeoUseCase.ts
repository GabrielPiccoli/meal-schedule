import { inject, injectable } from "tsyringe";

import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteSeoUseCase {
  constructor(
    @inject("SeoRepository")
    private seoRepository: ISeoRepository
  ) {}

  async execute() {
    const seoExists = await this.seoRepository.getSeo();

    if (!seoExists) {
      throw new AppError("The seo does not exists");
    }

    await this.seoRepository.delete();
  }
}

export { DeleteSeoUseCase };

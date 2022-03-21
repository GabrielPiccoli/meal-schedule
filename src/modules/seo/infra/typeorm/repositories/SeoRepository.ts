import { getRepository, Repository } from "typeorm";

import { ICreateSeoDTO } from "@modules/seo/dtos/ICreateSeoDTO";
import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";

import { SEO } from "../entities/SEO";

class SeoRepository implements ISeoRepository {
  private repository: Repository<SEO>;

  constructor() {
    this.repository = getRepository(SEO);
  }

  async create({
    id,
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
  }: ICreateSeoDTO): Promise<SEO> {
    const seo = this.repository.create({
      id,
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

    await this.repository.save(seo);

    return seo;
  }

  async delete(): Promise<void> {
    const seo = await this.getSeo();
    await this.repository.delete(seo.id);
  }

  async getSeo(): Promise<SEO> {
    const seo = await this.repository.findOne();
    return seo;
  }
}

export { SeoRepository };

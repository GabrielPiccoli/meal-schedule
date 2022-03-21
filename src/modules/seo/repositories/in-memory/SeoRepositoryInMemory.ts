import { ICreateSeoDTO } from "@modules/seo/dtos/ICreateSeoDTO";
import { SEO } from "@modules/seo/infra/typeorm/entities/SEO";

import { ISeoRepository } from "../ISeoRepository";

class SeoRepositoryInMemory implements ISeoRepository {
  seo: SEO;

  async create({
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
    this.seo = new SEO();

    Object.assign(this.seo, {
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

    return this.seo;
  }

  async delete(): Promise<void> {
    this.seo = null;
  }

  async getSeo(): Promise<SEO> {
    return this.seo;
  }
}

export { SeoRepositoryInMemory };

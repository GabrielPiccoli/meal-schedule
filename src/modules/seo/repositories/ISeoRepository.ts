import { ICreateSeoDTO } from "@modules/seo/dtos/ICreateSeoDTO";
import { SEO } from "@modules/seo/infra/typeorm/entities/SEO";

interface ISeoRepository {
  create(data: ICreateSeoDTO): Promise<SEO>;
  delete(): Promise<void>;
  getSeo(): Promise<SEO>;
}

export { ISeoRepository };

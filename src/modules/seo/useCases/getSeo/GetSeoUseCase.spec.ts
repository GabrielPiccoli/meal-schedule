import { SeoRepositoryInMemory } from "@modules/seo/repositories/in-memory/SeoRepositoryInMemory";
import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";

import { CreateSeoUseCase } from "../createSEO/CreateSeoUseCase";
import { GetSeoUseCase } from "./GetSeoUseCase";

let seoRepositoryInMemory: ISeoRepository;
let createSeoUseCase: CreateSeoUseCase;
let getSeoUseCase: GetSeoUseCase;

describe("Get SEO", () => {
  beforeEach(() => {
    seoRepositoryInMemory = new SeoRepositoryInMemory();
    createSeoUseCase = new CreateSeoUseCase(seoRepositoryInMemory);
    getSeoUseCase = new GetSeoUseCase(seoRepositoryInMemory);
  });

  it("should be to get a SEO", async () => {
    await createSeoUseCase.execute({
      title: "Title Test",
      description: "Description Test",
      keywords: "Keywords Test",
      author: "Author Test",
      fbpixel_code: "Pixel Code Test",
      ga_code: "Analytics Code Test",
      schema_twitter: "Link Twitter",
      schema_facebook: "Link Facebook",
      schema_linkedin: "Link Linkedin",
      schema_instagram: "Link Instagram",
      schema_street: "Schema Street",
      schema_region: "Schema Region",
      schema_cep: "Schema CEP",
      schema_country: "Schema Country",
    });

    const seo = await getSeoUseCase.execute();

    expect(seo.title).toEqual("Title Test");
  });
});

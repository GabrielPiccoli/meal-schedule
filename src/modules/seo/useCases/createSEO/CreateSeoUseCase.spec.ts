import { SeoRepositoryInMemory } from "@modules/seo/repositories/in-memory/SeoRepositoryInMemory";
import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateSeoUseCase } from "./CreateSeoUseCase";

let seoRepositoryInMemory: ISeoRepository;
let createSeoUseCase: CreateSeoUseCase;

describe("Create SEO", () => {
  beforeEach(() => {
    seoRepositoryInMemory = new SeoRepositoryInMemory();
    createSeoUseCase = new CreateSeoUseCase(seoRepositoryInMemory);
  });

  it("should able to create a SEO", async () => {
    const seo = await createSeoUseCase.execute({
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

    expect(seo).toHaveProperty("id");
  });

  it("should not able to create more than one SEO", async () => {
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

    await expect(
      createSeoUseCase.execute({
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
      })
    ).rejects.toEqual(new AppError("The SEO already exists"));
  });
});

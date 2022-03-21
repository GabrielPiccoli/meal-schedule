import { SeoRepositoryInMemory } from "@modules/seo/repositories/in-memory/SeoRepositoryInMemory";
import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateSeoUseCase } from "../createSEO/CreateSeoUseCase";
import { UpdateSeoUseCase } from "./UpdateSeoUseCase";

let seoRepositoryInMemory: ISeoRepository;
let createSeoUseCase: CreateSeoUseCase;
let updateSeoUseCase: UpdateSeoUseCase;

describe("Update SEO", () => {
  beforeEach(() => {
    seoRepositoryInMemory = new SeoRepositoryInMemory();
    createSeoUseCase = new CreateSeoUseCase(seoRepositoryInMemory);
    updateSeoUseCase = new UpdateSeoUseCase(seoRepositoryInMemory);
  });

  it("should be able to update a SEO", async () => {
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

    const seoUpdated = await updateSeoUseCase.execute({
      title: "Title Test Updated",
      description: "Description Test Updated",
      keywords: "Keywords Test Updated",
      author: "Author Test Updated",
      fbpixel_code: "Pixel Code Test Updated",
      ga_code: "Analytics Code Test Updated",
      schema_twitter: "Link Twitter Updated",
      schema_facebook: "Link Facebook Updated",
      schema_linkedin: "Link Linkedin Updated",
      schema_instagram: "Link Instagram Updated",
      schema_street: "Schema Street Updated",
      schema_region: "Schema Region Updated",
      schema_cep: "Schema CEP Updated",
      schema_country: "Schema Country Updated",
    });

    expect(seoUpdated.title).toEqual("Title Test Updated");
  });

  it("should not be able to update a non exists SEO", async () => {
    await expect(
      updateSeoUseCase.execute({
        title: "Title Test Updated",
        description: "Description Test Updated",
        keywords: "Keywords Test Updated",
        author: "Author Test Updated",
        fbpixel_code: "Pixel Code Test Updated",
        ga_code: "Analytics Code Test Updated",
        schema_twitter: "Link Twitter Updated",
        schema_facebook: "Link Facebook Updated",
        schema_linkedin: "Link Linkedin Updated",
        schema_instagram: "Link Instagram Updated",
        schema_street: "Schema Street Updated",
        schema_region: "Schema Region Updated",
        schema_cep: "Schema CEP Updated",
        schema_country: "Schema Country Updated",
      })
    ).rejects.toEqual(new AppError("The SEO does not exists"));
  });
});

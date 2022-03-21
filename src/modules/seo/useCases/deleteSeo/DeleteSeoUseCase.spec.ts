import { SeoRepositoryInMemory } from "@modules/seo/repositories/in-memory/SeoRepositoryInMemory";
import { ISeoRepository } from "@modules/seo/repositories/ISeoRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateSeoUseCase } from "../createSEO/CreateSeoUseCase";
import { DeleteSeoUseCase } from "./DeleteSeoUseCase";

let seoRepositoryInMemory: ISeoRepository;
let deleteSeoUseCase: DeleteSeoUseCase;
let createSeoUseCase: CreateSeoUseCase;

describe("Delete SEO", () => {
  beforeEach(() => {
    seoRepositoryInMemory = new SeoRepositoryInMemory();
    deleteSeoUseCase = new DeleteSeoUseCase(seoRepositoryInMemory);
    createSeoUseCase = new CreateSeoUseCase(seoRepositoryInMemory);
  });

  it("should be able to delete a SEO", async () => {
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

    await deleteSeoUseCase.execute();

    const seo = await seoRepositoryInMemory.getSeo();

    expect(seo).toBe(null);
  });

  it("should not be able to delete a non exists SEO", async () => {
    await expect(deleteSeoUseCase.execute()).rejects.toEqual(
      new AppError("The seo does not exists")
    );
  });
});

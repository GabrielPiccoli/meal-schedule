import { ProfilesRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesRepositoryInMemory";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateProfileUseCase } from "./CreateProfileUseCase";

let profilesRepositoryInMemory: IProfilesRepository;
let createProfileUseCase: CreateProfileUseCase;

describe("Create Profile", () => {
  beforeEach(() => {
    profilesRepositoryInMemory = new ProfilesRepositoryInMemory();
    createProfileUseCase = new CreateProfileUseCase(profilesRepositoryInMemory);
  });

  it("should be able to create a new profile", async () => {
    const profile = await createProfileUseCase.execute({
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      username: "john",
    });

    expect(profile).toHaveProperty("id");
  });

  it("should not be able to create a new profile with same username", async () => {
    await createProfileUseCase.execute({
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      username: "john",
    });

    await expect(
      createProfileUseCase.execute({
        email: "john.doe2@test.com",
        name: "John Doe2",
        password: "12345",
        username: "john",
      })
    ).rejects.toEqual(new AppError("Username already exists"));
  });
});

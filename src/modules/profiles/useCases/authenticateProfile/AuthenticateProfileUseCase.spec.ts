import { ICreateProfileDTO } from "@modules/profiles/dtos/ICreateProfileDTO";
import { ProfilesRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesRepositoryInMemory";
import { ProfilesTokenRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesTokenRepositoryInMemory";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { IProfilesTokenRepository } from "@modules/profiles/repositories/IProfilesTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateProfileUseCase } from "../createProfile/CreateProfileUseCase";
import { AuthenticateProfileUseCase } from "./AuthenticateProfileUseCase";

let profilesRepositoryInMemory: IProfilesRepository;
let profilesTokenRepositoryInMemory: IProfilesTokenRepository;
let dateProvider: IDateProvider;
let authenticateProfileUseCase: AuthenticateProfileUseCase;
let createProfileUseCase: CreateProfileUseCase;

describe("Authenticate Profile", () => {
  beforeEach(() => {
    profilesRepositoryInMemory = new ProfilesRepositoryInMemory();
    profilesTokenRepositoryInMemory = new ProfilesTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateProfileUseCase = new AuthenticateProfileUseCase(
      profilesRepositoryInMemory,
      profilesTokenRepositoryInMemory,
      dateProvider
    );
    createProfileUseCase = new CreateProfileUseCase(profilesRepositoryInMemory);
  });

  it("should be able to authenticate a profile", async () => {
    const profile: ICreateProfileDTO = {
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      username: "john",
    };
    await createProfileUseCase.execute(profile);

    const result = await authenticateProfileUseCase.execute({
      username: profile.username,
      password: profile.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non exists profile", async () => {
    await expect(
      authenticateProfileUseCase.execute({
        username: "admin",
        password: "admin",
      })
    ).rejects.toEqual(new AppError("User or password incorrect"));
  });

  it("should not be able to authenticate a profile with wrong password", async () => {
    const profile: ICreateProfileDTO = {
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      username: "john",
    };
    await createProfileUseCase.execute(profile);

    await expect(
      authenticateProfileUseCase.execute({
        username: profile.username,
        password: "admin",
      })
    ).rejects.toEqual(new AppError("User or password incorrect"));
  });
});

import { ICreateProfileDTO } from "@modules/profiles/dtos/ICreateProfileDTO";
import { ProfilesRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesRepositoryInMemory";
import { ProfilesTokenRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesTokenRepositoryInMemory";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { IProfilesTokenRepository } from "@modules/profiles/repositories/IProfilesTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateProfileUseCase } from "../authenticateProfile/AuthenticateProfileUseCase";
import { CreateProfileUseCase } from "../createProfile/CreateProfileUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

let profilesRepositoryInMemory: IProfilesRepository;
let profilesTokenRepositoryInMemory: IProfilesTokenRepository;
let dateProvider: IDateProvider;
let refreshTokenUseCase: RefreshTokenUseCase;
let authenticateProfileUseCase: AuthenticateProfileUseCase;
let createProfileUseCase: CreateProfileUseCase;

describe("Refresh Profile Token", () => {
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
    refreshTokenUseCase = new RefreshTokenUseCase(
      profilesTokenRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to refresh a profile token", async () => {
    const profile: ICreateProfileDTO = {
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      user: "john",
    };
    await createProfileUseCase.execute(profile);

    const { refresh_token } = await authenticateProfileUseCase.execute({
      user: profile.user,
      password: profile.password,
    });
    const result = await refreshTokenUseCase.execute(refresh_token);

    expect(result).toHaveProperty("token");
  });

  it("should not be able to refresh a non exists profile token", async () => {
    const profile: ICreateProfileDTO = {
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      user: "john",
    };
    await createProfileUseCase.execute(profile);

    const { refresh_token } = await authenticateProfileUseCase.execute({
      user: profile.user,
      password: profile.password,
    });

    const profileToken =
      await profilesTokenRepositoryInMemory.findByRefreshToken(refresh_token);

    await profilesTokenRepositoryInMemory.deleteById(profileToken.id);

    await expect(refreshTokenUseCase.execute(refresh_token)).rejects.toEqual(
      new AppError("Refresh token does not exists")
    );
  });
});

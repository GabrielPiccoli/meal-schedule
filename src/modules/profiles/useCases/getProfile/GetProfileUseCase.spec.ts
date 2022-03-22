import { ProfilesRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesRepositoryInMemory";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

import { GetProfileUseCase } from "./GetProfileUseCase";

let profilesRepositoryInMemory: IProfilesRepository;
let getProfileUseCase: GetProfileUseCase;

describe("Get Profile (me)", () => {
  beforeEach(() => {
    profilesRepositoryInMemory = new ProfilesRepositoryInMemory();
    getProfileUseCase = new GetProfileUseCase(profilesRepositoryInMemory);
  });

  it("should be able to get a profile", async () => {
    const profile = await profilesRepositoryInMemory.create({
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      username: "john",
    });

    const profileMe = await getProfileUseCase.execute(profile.id);

    expect(profileMe.name).toBe("John Doe");
  });

  it("should not be able to get a profile non exists", async () => {
    await expect(getProfileUseCase.execute("1234")).rejects.toEqual(
      new AppError("Profile does not exists")
    );
  });
});

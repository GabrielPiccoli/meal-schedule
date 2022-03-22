import { ProfilesRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesRepositoryInMemory";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

let profilesRepositoryInMemory: IProfilesRepository;
let updateProfileUseCase: UpdateProfileUseCase;

describe("Update Profile", () => {
  beforeEach(() => {
    profilesRepositoryInMemory = new ProfilesRepositoryInMemory();
    updateProfileUseCase = new UpdateProfileUseCase(profilesRepositoryInMemory);
  });

  it("should be able to update a profile", async () => {
    const profile = await profilesRepositoryInMemory.create({
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      username: "john",
    });

    const updatedProfile = await updateProfileUseCase.execute({
      email: "john.doe@test.com",
      name: "John Doe Updated",
      password: "1234",
      username: "john",
      id: profile.id,
    });

    expect(updatedProfile.name).toEqual("John Doe Updated");
  });

  it("should not be able to update a non exists profile", async () => {
    await expect(
      updateProfileUseCase.execute({
        email: "john.doe@test.com",
        name: "John Doe Updated",
        password: "1234",
        username: "john",
        id: "12345",
      })
    ).rejects.toEqual(new AppError("Profile does not exists"));
  });
});

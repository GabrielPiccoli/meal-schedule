import { ProfilesRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesRepositoryInMemory";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

import { DeleteProfileUseCase } from "./DeleteProfileUseCase";

let profilesRepositoryInMemory: IProfilesRepository;
let deleteProfileUseCase: DeleteProfileUseCase;

describe("Delete Profile", () => {
  beforeEach(() => {
    profilesRepositoryInMemory = new ProfilesRepositoryInMemory();
    deleteProfileUseCase = new DeleteProfileUseCase(profilesRepositoryInMemory);
  });

  it("should be able to delete a profile", async () => {
    const profile = await profilesRepositoryInMemory.create({
      email: "john.doe2@test.com",
      name: "John Doe2",
      password: "12345",
      user: "john",
    });
    await deleteProfileUseCase.execute(profile.id);
    const profiles = await profilesRepositoryInMemory.list();

    expect(profiles.length).toBe(0);
  });

  it("should not be able to delete a non exists profile", async () => {
    await expect(deleteProfileUseCase.execute("1234")).rejects.toEqual(
      new AppError("Profile does not exists")
    );
  });
});

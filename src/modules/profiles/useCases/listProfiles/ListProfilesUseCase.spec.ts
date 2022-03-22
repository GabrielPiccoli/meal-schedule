import { ProfilesRepositoryInMemory } from "@modules/profiles/repositories/in-memory/ProfilesRepositoryInMemory";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";

import { ListProfilesUseCase } from "./ListProfilesUseCase";

let profilesRepositoryInMemory: IProfilesRepository;
let listProfilesUseCase: ListProfilesUseCase;

describe("List Profiles", () => {
  beforeEach(() => {
    profilesRepositoryInMemory = new ProfilesRepositoryInMemory();
    listProfilesUseCase = new ListProfilesUseCase(profilesRepositoryInMemory);
  });

  it("should be able to list all profiles", async () => {
    await profilesRepositoryInMemory.create({
      email: "john.doe@test.com",
      name: "John Doe",
      password: "1234",
      username: "john",
    });
    const profiles = await listProfilesUseCase.execute();

    expect(profiles).toHaveLength(1);
  });
});

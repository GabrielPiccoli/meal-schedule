import { ICreateProfileDTO } from "@modules/profiles/dtos/ICreateProfileDTO";
import { Profile } from "@modules/profiles/infra/typeorm/entities/Profile";

import { IProfilesRepository } from "../IProfilesRepository";

class ProfilesRepositoryInMemory implements IProfilesRepository {
  profiles: Profile[] = [];

  async create({
    email,
    name,
    password,
    username,
  }: ICreateProfileDTO): Promise<Profile> {
    const profile = new Profile();

    Object.assign(profile, {
      email,
      name,
      password,
      username,
    });

    this.profiles.push(profile);

    return profile;
  }

  async findByUser(username: string): Promise<Profile> {
    const profile = this.profiles.find(
      (profile) => profile.username === username
    );
    return profile;
  }

  async list(): Promise<Profile[]> {
    const all = this.profiles;
    return all;
  }

  async findById(id: string): Promise<Profile> {
    const profile = this.profiles.find((profile) => profile.id === id);
    return profile;
  }

  async deleteById(id: string): Promise<void> {
    const profile = await this.findById(id);
    const indexOfProfile = this.profiles.indexOf(profile);
    this.profiles.splice(indexOfProfile, 1);
  }
}

export { ProfilesRepositoryInMemory };

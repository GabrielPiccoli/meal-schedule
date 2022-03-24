import { getRepository, Repository } from "typeorm";

import { ICreateProfileDTO } from "@modules/profiles/dtos/ICreateProfileDTO";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";

import { Profile } from "../entities/Profile";

class ProfilesRepository implements IProfilesRepository {
  private repository: Repository<Profile>;

  constructor() {
    this.repository = getRepository(Profile);
  }

  async create({
    email,
    name,
    password,
    username,
    id,
  }: ICreateProfileDTO): Promise<Profile> {
    const profile = this.repository.create({
      email,
      name,
      password,
      username,
      id,
    });

    await this.repository.save(profile);

    return profile;
  }

  async findByUser(username: string): Promise<Profile> {
    const profile = await this.repository.findOne({ username });
    return profile;
  }

  async list(): Promise<Profile[]> {
    const profiles = this.repository.find();
    return profiles;
  }

  async findById(id: string): Promise<Profile> {
    const profile = await this.repository.findOne(id);
    return profile;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByEmail(email: string): Promise<Profile> {
    const profile = await this.repository.findOne({ email });
    return profile;
  }
}

export { ProfilesRepository };

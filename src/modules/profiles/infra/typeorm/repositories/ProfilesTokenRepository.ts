import { getRepository, Repository } from "typeorm";

import { ICreateProfileTokenDTO } from "@modules/profiles/dtos/ICreateProfileTokenDTO";
import { IProfilesTokenRepository } from "@modules/profiles/repositories/IProfilesTokenRepository";

import { ProfilesToken } from "../entities/ProfileToken";

class ProfilesTokenRepository implements IProfilesTokenRepository {
  private repository: Repository<ProfilesToken>;

  constructor() {
    this.repository = getRepository(ProfilesToken);
  }

  async create({
    expires_date,
    refresh_token,
    profile_id,
  }: ICreateProfileTokenDTO): Promise<ProfilesToken> {
    const profileToken = this.repository.create({
      expires_date,
      refresh_token,
      profile_id,
    });

    await this.repository.save(profileToken);

    return profileToken;
  }

  async findByProfileIdAndRefreshToken(
    profile_id: string,
    refresh_token: string
  ): Promise<ProfilesToken> {
    const profileToken = await this.repository.findOne({
      profile_id,
      refresh_token,
    });

    return profileToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<ProfilesToken> {
    const profileToken = await this.repository.findOne({ refresh_token });
    return profileToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ProfilesTokenRepository };

import { ICreateProfileTokenDTO } from "@modules/profiles/dtos/ICreateProfileTokenDTO";
import { ProfilesToken } from "@modules/profiles/infra/typeorm/entities/ProfileToken";

import { IProfilesTokenRepository } from "../IProfilesTokenRepository";

class ProfilesTokenRepositoryInMemory implements IProfilesTokenRepository {
  profilesToken: ProfilesToken[] = [];

  async create({
    expires_date,
    refresh_token,
    profile_id,
  }: ICreateProfileTokenDTO): Promise<ProfilesToken> {
    const profileToken = new ProfilesToken();

    Object.assign(profileToken, {
      expires_date,
      refresh_token,
      profile_id,
    });

    this.profilesToken.push(profileToken);

    return profileToken;
  }

  async findByProfileIdAndRefreshToken(
    profile_id: string,
    refresh_token: string
  ): Promise<ProfilesToken> {
    const profileToken = this.profilesToken.find(
      (pt) => pt.profile_id === profile_id && pt.refresh_token === refresh_token
    );
    return profileToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<ProfilesToken> {
    const profileToken = this.profilesToken.find(
      (pt) => pt.refresh_token === refresh_token
    );
    return profileToken;
  }

  async deleteById(id: string): Promise<void> {
    const profileToken = this.profilesToken.find((pt) => pt.id === id);
    this.profilesToken.splice(this.profilesToken.indexOf(profileToken));
  }
}

export { ProfilesTokenRepositoryInMemory };

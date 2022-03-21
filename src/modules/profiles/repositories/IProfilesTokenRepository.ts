import { ICreateProfileTokenDTO } from "../dtos/ICreateProfileTokenDTO";
import { ProfilesToken } from "../infra/typeorm/entities/ProfileToken";

interface IProfilesTokenRepository {
  create({
    expires_date,
    refresh_token,
    profile_id,
  }: ICreateProfileTokenDTO): Promise<ProfilesToken>;

  findByProfileIdAndRefreshToken(
    profile_id: string,
    refresh_token: string
  ): Promise<ProfilesToken>;

  findByRefreshToken(refresh_token: string): Promise<ProfilesToken>;

  deleteById(id: string): Promise<void>;
}

export { IProfilesTokenRepository };

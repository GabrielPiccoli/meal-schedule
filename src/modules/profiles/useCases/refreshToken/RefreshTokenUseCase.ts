import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IProfilesTokenRepository } from "@modules/profiles/repositories/IProfilesTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  username: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("ProfilesTokenRepository")
    private profilesTokenRepository: IProfilesTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { username, sub } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;
    const profile_id = sub;
    const profileToken =
      await this.profilesTokenRepository.findByProfileIdAndRefreshToken(
        profile_id,
        token
      );

    if (!profileToken) {
      throw new AppError("Refresh token does not exists");
    }

    await this.profilesTokenRepository.deleteById(profileToken.id);

    const refresh_token = sign({ username }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.profilesTokenRepository.create({
      expires_date,
      refresh_token,
      profile_id,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: profile_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };

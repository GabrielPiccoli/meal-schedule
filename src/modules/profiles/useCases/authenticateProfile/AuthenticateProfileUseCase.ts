import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { IProfilesTokenRepository } from "@modules/profiles/repositories/IProfilesTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user: string;
  password: string;
}

interface IResponse {
  profile: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: IProfilesRepository,
    @inject("ProfilesTokenRepository")
    private profilesTokenRepository: IProfilesTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ user, password }: IRequest): Promise<IResponse> {
    const profile = await this.profilesRepository.findByUser(user);
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!profile) {
      throw new AppError("User or password incorrect");
    }

    const passwordMatch = await compare(password, profile.password);

    if (!passwordMatch) {
      throw new AppError("User or password incorrect");
    }

    const token = sign({}, secret_token, {
      subject: profile.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ user }, secret_refresh_token, {
      subject: profile.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.profilesTokenRepository.create({
      profile_id: profile.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      token,
      profile: {
        name: profile.name,
        email: profile.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}

export { AuthenticateProfileUseCase };

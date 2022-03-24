import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

import { ICreateProfileDTO } from "@modules/profiles/dtos/ICreateProfileDTO";
import { Profile } from "@modules/profiles/infra/typeorm/entities/Profile";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: IProfilesRepository
  ) {}

  async execute({
    email,
    name,
    password,
    username,
  }: ICreateProfileDTO): Promise<Profile> {
    const profileUsernameAlreadyExists =
      await this.profilesRepository.findByUser(username);

    if (profileUsernameAlreadyExists) {
      throw new AppError("Username already used");
    }

    const profileEmailAlreadyExists = await this.profilesRepository.findByEmail(
      email
    );

    if (profileEmailAlreadyExists) {
      throw new AppError("Email already used");
    }

    const passwordHash = await hash(password, 8);
    const profile = await this.profilesRepository.create({
      email,
      name,
      password: passwordHash,
      username,
    });
    const profileTreated = instanceToPlain(profile) as Profile;

    return profileTreated;
  }
}

export { CreateProfileUseCase };

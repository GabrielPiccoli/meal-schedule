import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

import { ICreateProfileDTO } from "@modules/profiles/dtos/ICreateProfileDTO";
import { Profile } from "@modules/profiles/infra/typeorm/entities/Profile";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: IProfilesRepository
  ) {}

  async execute({
    email,
    name,
    password,
    user,
    id,
  }: ICreateProfileDTO): Promise<Profile> {
    const profileExists = await this.profilesRepository.findById(id);

    if (!profileExists) {
      throw new AppError("Profile does not exists");
    }

    const passwordHash = await hash(password, 8);
    const profile = await this.profilesRepository.create({
      id,
      email,
      name,
      password: passwordHash,
      user,
    });
    const profileTreated = instanceToPlain(profile) as Profile;

    return profileTreated;
  }
}

export { UpdateProfileUseCase };

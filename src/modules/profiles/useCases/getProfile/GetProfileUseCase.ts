import { instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

import { Profile } from "@modules/profiles/infra/typeorm/entities/Profile";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class GetProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: IProfilesRepository
  ) {}

  async execute(id: string): Promise<Profile> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new AppError("Profile does not exists");
    }

    const profileTreated = instanceToPlain(profile) as Profile;
    return profileTreated;
  }
}

export { GetProfileUseCase };

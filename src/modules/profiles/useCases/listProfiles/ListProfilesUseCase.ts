import { instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

import { Profile } from "@modules/profiles/infra/typeorm/entities/Profile";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";

@injectable()
class ListProfilesUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: IProfilesRepository
  ) {}

  async execute(): Promise<Profile[]> {
    const all = await this.profilesRepository.list();
    const profiles = instanceToPlain(all) as Profile[];

    return profiles;
  }
}

export { ListProfilesUseCase };

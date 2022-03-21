import { inject, injectable } from "tsyringe";

import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteProfileUseCase {
  constructor(
    @inject("ProfilesRepository")
    private profilesRepository: IProfilesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const profileExists = await this.profilesRepository.findById(id);

    if (!profileExists) {
      throw new AppError("Profile does not exists");
    }

    await this.profilesRepository.deleteById(id);
  }
}

export { DeleteProfileUseCase };

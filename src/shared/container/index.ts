import { container } from "tsyringe";

import "@shared/container/providers";
import { MealsRepository } from "@modules/meals/infra/typeorm/repositories/MealsRepository";
import { IMealsRepository } from "@modules/meals/repositories/IMealsRepository";
import { ProfilesRepository } from "@modules/profiles/infra/typeorm/repositories/ProfilesRepository";
import { ProfilesTokenRepository } from "@modules/profiles/infra/typeorm/repositories/ProfilesTokenRepository";
import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { IProfilesTokenRepository } from "@modules/profiles/repositories/IProfilesTokenRepository";

container.registerSingleton<IProfilesRepository>(
  "ProfilesRepository",
  ProfilesRepository
);

container.registerSingleton<IProfilesTokenRepository>(
  "ProfilesTokenRepository",
  ProfilesTokenRepository
);

container.registerSingleton<IMealsRepository>(
  "MealsRepository",
  MealsRepository
);

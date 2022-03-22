import { ICreateProfileDTO } from "../dtos/ICreateProfileDTO";
import { Profile } from "../infra/typeorm/entities/Profile";

interface IProfilesRepository {
  create(data: ICreateProfileDTO): Promise<Profile>;
  findByUser(username: string): Promise<Profile>;
  list(): Promise<Profile[]>;
  findById(id: string): Promise<Profile>;
  deleteById(id: string): Promise<void>;
}

export { IProfilesRepository };

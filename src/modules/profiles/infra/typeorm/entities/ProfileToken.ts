import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Profile } from "./Profile";

@Entity("profiles_token")
class ProfilesToken {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  profile_id: string;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: "profile_id" })
  profile: Profile;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { ProfilesToken };

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("seo")
class SEO {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  keywords: string;

  @Column()
  author: string;

  @Column()
  fbpixel_code: string;

  @Column()
  ga_code: string;

  @Column()
  schema_twitter: string;

  @Column()
  schema_facebook: string;

  @Column()
  schema_linkedin: string;

  @Column()
  schema_instagram: string;

  @Column()
  schema_street: string;

  @Column()
  schema_region: string;

  @Column()
  schema_cep: string;

  @Column()
  schema_country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { SEO };

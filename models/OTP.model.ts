// src/entities/OTP.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.model";
import { base } from "./Base.model";

@Entity()
export class OTP extends base {
  @Column()
  code: string;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.otps)
  @JoinColumn()
  user: User;
}

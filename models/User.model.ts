import { Entity, Column, OneToMany, JoinColumn } from "typeorm";
import { base } from "./Base.model";
import { OTP } from "./OTP.model";

@Entity()
export class User extends base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetToken: string;

  @OneToMany(() => OTP, (otp) => otp.user)
  @JoinColumn({ name: "user_id" })
  otps: OTP[];
}

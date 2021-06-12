import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "./User";

@Entity("connections")
class Connection {
  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  socket_id: string;

  //make the relationship between tables
  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //generate a new random id if it doesn't exists
  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { Connection };

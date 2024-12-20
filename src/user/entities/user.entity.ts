import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/entities/abstract.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @Column()
  login: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ default: 1 })
  version: number; // integer number, increments on update
}

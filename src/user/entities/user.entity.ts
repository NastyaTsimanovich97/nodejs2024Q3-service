import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/entities/abstract.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  login: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ default: 0 })
  version: number; // integer number, increments on update
}

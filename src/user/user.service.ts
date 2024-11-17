import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const date = new Date().getTime();
    const userData = {
      id: uuidv4(),
      version: 1,
      createdAt: date,
      updatedAt: date,
      ...createUserDto,
    };

    await this.userRepository.save(userData);

    return userData;
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateUserDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const updatedUserRecord = await this.getById(id);

    if (!updatedUserRecord) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.oldPassword !== updatedUserRecord.password) {
      throw new ForbiddenException('Password is not correct');
    }

    const updatedUser = {
      ...updatedUserRecord,
      version: updatedUserRecord.version + 1,
      updatedAt: new Date().getTime(),
      password: updateUserDto.newPassword,
    };

    await this.userRepository.update({ id }, updatedUser);

    return updatedUser;
  }

  async delete(id: string): Promise<string> {
    const removedUserRecord = await this.getById(id);

    if (!removedUserRecord) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.delete({ id });

    return `User ${id} is removed`;
  }
}

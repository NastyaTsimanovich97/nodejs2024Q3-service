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
    const userData = {
      id: uuidv4(),
      version: 1,
      ...createUserDto,
    };

    const user = await this.userRepository.save(userData);

    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async getByLogin(login: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ login });
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const updatedUserRecord = await this.getById(id);

    if (!updatedUserRecord) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.oldPassword !== updatedUserRecord.password) {
      throw new ForbiddenException('Password is not correct');
    }

    const updatedUserData = {
      ...updatedUserRecord,
      updatedAt: new Date(),
      version: updatedUserRecord.version + 1,
      password: updateUserDto.newPassword,
    };

    await this.userRepository.update({ id }, updatedUserData);

    const updatedUser = await this.getById(id);

    return {
      ...updatedUser,
      createdAt: new Date(updatedUser.createdAt).getTime(),
      updatedAt: new Date(updatedUser.updatedAt).getTime(),
    };
  }

  async delete(id: string): Promise<string> {
    const removedUserRecord = await this.getById(id);

    if (!removedUserRecord) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete({ id });

    return `User ${id} is removed`;
  }
}

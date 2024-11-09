import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: UserEntity[] = [
    {
      id: '4786ec93-59f9-46f4-a2b7-59913cf749e0',
      login: 'admin',
      password: 'admin',
      version: 1,
      createdAt: 1731154017532,
      updatedAt: 1731154017532,
    },
  ];

  create(createUserDto: CreateUserDto): UserEntity {
    const date = new Date().getTime();
    const userData = {
      id: uuidv4(),
      version: 1,
      createdAt: date,
      updatedAt: date,
      ...createUserDto,
    };

    this.users.push(userData);

    return userData;
  }

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto): UserEntity {
    const updatedUserRecord = this.findOne(id);

    if (!updatedUserRecord) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.oldPassword !== updatedUserRecord.password) {
      throw new ForbiddenException('Password is not correct');
    }

    const updatedUser = {
      ...updatedUserRecord,
      updatedAt: new Date().getTime(),
      password: updateUserDto.newPassword,
    };

    return updatedUser;
  }

  remove(id: string): string {
    const removedUserRecord = this.findOne(id);

    if (!removedUserRecord) {
      throw new NotFoundException('User not found');
    }

    this.users = this.users.filter((user) => user.id !== id);

    return `User ${id} is removed`;
  }
}

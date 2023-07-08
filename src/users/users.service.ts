import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(userId: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ userId });
  }

  async insert(createUserDto: CreateUserDto): Promise<InsertResult | undefined> {
    return this.userRepository.insert(createUserDto);
  }

  async update(id: number, loginDto: LoginDto): Promise<UpdateResult | undefined> {
    return this.userRepository.update(id, loginDto);
  }

  async isFriend(userId: string, friendId: string): Promise<Boolean> {
    const user: User = await this.findOne(userId); 
    if(user.friends.indexOf(friendId) != -1) {
      return true;
    }
    return false;
  }

  async makeFriend(id: string, friendId: string) {
    const user: User = await this.findOne(id); 
    user.requestFriends.push(friendId);
    const friend: User = await this.findOne(friendId);
    friend.waitFriends.push(id);
    this.userRepository.update(user.id, user);
    this.userRepository.update(friend.id, friend);
    return "친구 추가 요청"
  }

  async confirmFriend(id: string, friendId: string) {
    const user: User = await this.findOne(id);
    const friend: User = await this.findOne(friendId);
    const idxUser: number = user.waitFriends.indexOf(friendId);
    const idxFriend: number = friend.requestFriends.indexOf(id);

    if (idxUser != -1 && idxFriend != -1) {
      user.friends.push(friendId);
      friend.friends.push(id);
      user.waitFriends.splice(idxUser, 1);
      friend.requestFriends.splice(idxFriend, 1);
      this.userRepository.update(user.id, user);
      this.userRepository.update(friend.id, friend);
      return "친구 추가 완료";
    }
    else {
      return "오류";
    }
  }
}

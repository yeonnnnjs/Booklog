import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'auth/dto/create-user.dto';
import { LoginDto } from 'auth/dto/login.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserFriendsDto } from './dto/user-friends.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async insert(createUserDto: CreateUserDto): Promise<InsertResult | undefined> {
    return this.userRepository.insert(createUserDto);
  }

  async update(id: number, loginDto: LoginDto): Promise<UpdateResult | undefined> {
    return this.userRepository.update(id, loginDto);
  }

  async isFriend(userId: number, friendId: number): Promise<Boolean> {
    const user: User = await this.userRepository.findOneBy({ id : userId });
    if(user.friends.indexOf(String(friendId)) != -1) {
      return true;
    }
    return false;
  }

  async searchUser(userInfo: string, isEmail: boolean) {
    var users: User[]
    if(isEmail) {
      users = await this.userRepository.findBy({ email : userInfo });
    }
    else {
      users = await this.userRepository.findBy({ name : userInfo });
    }

    if(!users[0]) {
      return "유저를 찾을 수 없습니다.";
    }
    else {
      const profileDtos: UserProfileDto[] = users.map(entity => ({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        description: entity.description
      }));
      return profileDtos;
    }
  }

  async makeFriend(email: string, friendEmail: string) {
    const user: User = await this.findOne(email); 
    user.requestFriends.push(friendEmail);
    const friend: User = await this.findOne(friendEmail);
    friend.waitFriends.push(email);
    this.update(user.id, user);
    this.update(friend.id, friend);
    return "친구 추가 요청"
  }

  async acceptFriend(email: string, friendEmail: string) {
    const user: User = await this.findOne(email);
    const friend: User = await this.findOne(friendEmail);
    const idxUser: number = user.waitFriends.indexOf(friendEmail);
    const idxFriend: number = friend.requestFriends.indexOf(email);

    if (idxUser != -1 && idxFriend != -1) {
      user.friends.push(friendEmail);
      friend.friends.push(email);
      user.waitFriends.splice(idxUser, 1);
      friend.requestFriends.splice(idxFriend, 1);
      this.update(user.id, user);
      this.update(friend.id, friend);
      return "친구 추가 신청 수락";
    }
    else {
      return "오류";
    }
  }

  async getProfile(userId: number) {
    const user: User = await this.userRepository.findOneBy({ id : userId });
    if(!user) {
      return "유저를 찾을 수 없습니다.";
    }
    else {
      const profileDto: UserProfileDto = {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description
      };
      return profileDto;
    }
  }

  async getFriendList(email: string) {
    const user: User = await this.userRepository.findOneBy({ email : email });
    if(!user) {
      return "유저를 찾을 수 없습니다.";
    }
    else {
      const friendsDto: UserFriendsDto = {
        friends : user.friends,
        waitFriends : user.waitFriends,
        requestFriends : user.requestFriends
      };
      return friendsDto;
    }
  }

  async declineFriend(email: string, friendEmail: string) {
    const user: User = await this.findOne(email);
    const friend: User = await this.findOne(friendEmail);
    const idxUser: number = user.waitFriends.indexOf(friendEmail);
    const idxFriend: number = friend.requestFriends.indexOf(email);

    if (idxUser != -1 && idxFriend != -1) {
      user.waitFriends.splice(idxUser, 1);
      friend.requestFriends.splice(idxFriend, 1);
      this.update(user.id, user);
      this.update(friend.id, friend);
      return "친구 추가 신청 거절";
    }
    else {
      return "오류";
    }
  }
}

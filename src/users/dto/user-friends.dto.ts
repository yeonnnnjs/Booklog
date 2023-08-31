import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserFriendsDto {
    friends : string[];
    waitFriends : string[];
    requestFriends : string[];
}

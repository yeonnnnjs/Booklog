import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserProfileDto {

    id: number;

    email: string;

    name: string;

    description: string;
}

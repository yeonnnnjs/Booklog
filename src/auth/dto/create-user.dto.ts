import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    userId: string;
  
    @IsNotEmpty()
    password: string;
}

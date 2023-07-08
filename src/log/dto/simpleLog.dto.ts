import { IsNotEmpty, IsEmail } from 'class-validator';

export class SimpleLogDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    title: string;
  
    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    totalPage: number;

    @IsNotEmpty()
    currentPage: number;
}

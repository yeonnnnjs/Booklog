import { IsNotEmpty, IsEmail } from 'class-validator';

export class MakeLogDto {
    @IsNotEmpty()
    title: string;
  
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    author: string;

    memo: string;
    
    @IsNotEmpty()
    totalPage: number;

    @IsNotEmpty()
    currentPage: number;

    bookmark: number[];
}

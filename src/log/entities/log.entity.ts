import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    memo: string;

    @Column()
    totalPage: number;

    @Column()
    currentPage: number;

    @Column("int", { array: true })
    bookmark: number[];
}

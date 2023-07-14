import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

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

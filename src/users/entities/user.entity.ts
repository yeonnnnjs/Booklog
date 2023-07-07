import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    userId: string;

    @Column()
    name: string;
}

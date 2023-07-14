import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
    friends: string[];

    @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
    waitFriends: string[];

    @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
    requestFriends: string[];
}

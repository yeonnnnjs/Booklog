import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable : false })
    password: string;

    @Column({ nullable : false })
    email: string;

    @Column({ nullable : false })
    name: string;

    @Column({ nullable : true })
    description: string;

    @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
    friends: string[];

    @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
    waitFriends: string[];

    @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
    requestFriends: string[];
}

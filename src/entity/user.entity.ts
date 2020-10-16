import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryColumn()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
}
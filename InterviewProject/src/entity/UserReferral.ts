import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, JoinTable} from "typeorm";
import { User } from "./User";

@Entity()
export class UserReferral {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    referralId: number;

    @ManyToOne(type => User, user => user.userReferrals)
    user: User;
}
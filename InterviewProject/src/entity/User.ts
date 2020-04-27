import {Entity, PrimaryGeneratedColumn, Column,OneToMany} from "typeorm";
import { UserReferral } from "./UserReferral";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => UserReferral, userReferral => userReferral.user)
    userReferrals: UserReferral[];
}


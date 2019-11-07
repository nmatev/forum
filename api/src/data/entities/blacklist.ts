import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('blacklists')
export class Blacklist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @ManyToOne(type => User, user => user.blacklist)
    user: Promise<User>;

    @Column()
    expiresOn: string;
}

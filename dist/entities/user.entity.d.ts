import { UserI } from '../interfaces/user.interface';
import { BaseEntity } from 'typeorm';
import { Role } from './role.entity';
export declare class UserEntity extends BaseEntity implements UserI {
    id: number;
    email: string;
    password: string;
    get permissionCodes(): string[];
    role: Role;
}

import { Role } from './role.entity';
export declare class Permission {
    id: number;
    name: string;
    description?: string;
    roles: Role[];
}

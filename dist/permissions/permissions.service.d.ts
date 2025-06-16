import { CreatePermissionDto } from '../interfaces/create-permission.dto';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
export declare class PermissionsService {
    private permissionsRepository;
    private rolesRepository;
    constructor(permissionsRepository: Repository<Permission>, rolesRepository: Repository<Role>);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(): Promise<{
        id: number;
        name: string;
        description: string;
        roles: number[];
    }[]>;
}

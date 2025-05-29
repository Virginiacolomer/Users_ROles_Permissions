import { CreateRoleDto } from '../interfaces/create-role.dto';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
}

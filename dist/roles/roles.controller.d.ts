import { RolesService } from './roles.service';
import { CreateRoleDto } from '../interfaces/create-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("../entities/role.entity").Role>;
    findAll(): Promise<import("../entities/role.entity").Role[]>;
}

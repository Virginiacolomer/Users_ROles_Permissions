import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from '../interfaces/create-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("../entities/permission.entity").Permission>;
    findAll(): Promise<import("../entities/permission.entity").Permission[]>;
}

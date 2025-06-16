"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("../entities/permission.entity");
const role_entity_1 = require("../entities/role.entity");
let PermissionsService = class PermissionsService {
    constructor(permissionsRepository, rolesRepository) {
        this.permissionsRepository = permissionsRepository;
        this.rolesRepository = rolesRepository;
    }
    async create(createPermissionDto) {
        const roles = await this.rolesRepository.findByIds(createPermissionDto.roleIds);
        if (roles.length !== createPermissionDto.roleIds.length) {
            throw new common_1.NotFoundException('One or more roles not found');
        }
        const newPermission = this.permissionsRepository.create({
            name: createPermissionDto.name,
            description: createPermissionDto.description,
            roles: roles,
        });
        try {
            return await this.permissionsRepository.save(newPermission);
        }
        catch (error) {
            throw new common_1.HttpException('Error creating permission', 500);
        }
    }
    async findAll() {
        const permissions = await this.permissionsRepository
            .createQueryBuilder('permission')
            .leftJoinAndSelect('permission.roles', 'role')
            .getMany();
        return permissions.map(permission => ({
            id: permission.id,
            name: permission.name,
            description: permission.description,
            roles: permission.roles.map(role => role.id),
        }));
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map
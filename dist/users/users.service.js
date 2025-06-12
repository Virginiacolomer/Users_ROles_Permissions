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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jwt_service_1 = require("../jwt/jwt.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../entities/role.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository, rolesRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.jwtService = jwtService;
    }
    async refreshToken(refreshToken) {
        return this.jwtService.refreshToken(refreshToken);
    }
    canDo(user, permission) {
        const result = user.permissionCodes.includes(permission);
        if (!result) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    async register(body) {
        try {
            const user = new user_entity_1.UserEntity();
            user.email = body.email;
            user.password = await bcrypt.hash(body.password, 10);
            await this.usersRepository.save(user);
            return { status: 'created' };
        }
        catch (error) {
            throw new common_1.HttpException('Error de creación', 500);
        }
    }
    async login(body) {
        const user = await this.usersRepository.findOne({
            where: { email: body.email },
            relations: ['role', 'role.permissions'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const compareResult = (0, bcrypt_1.compareSync)(body.password, user.password);
        if (!compareResult) {
            throw new common_1.UnauthorizedException();
        }
        return {
            accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
            refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
        };
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
            relations: ['role', 'role.permissions'],
        });
    }
    async assignRoles(assignRoles) {
        const user = await this.usersRepository.findOne({
            where: { id: assignRoles.userId },
            relations: ['role'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (assignRoles.roleIds.length !== 1) {
            throw new Error('Solo un rol puede ser asignado por usuario');
        }
        const roleId = assignRoles.roleIds[0];
        const role = await this.rolesRepository.findOneBy({ id: roleId });
        if (!role) {
            throw new common_1.NotFoundException(`Role with id ${roleId} not found`);
        }
        user.role = role;
        await this.usersRepository.save(user);
        return {
            id: user.id,
            email: user.email,
            role: role.name,
        };
    }
    async findAllUsers() {
        const users = await this.usersRepository.find({ relations: ['role'] });
        return users.map(user => ({
            id: user.id,
            email: user.email,
            role: user.role?.name || null,
        }));
    }
    async create(createUserDto) {
        const role = await this.rolesRepository.findOne({
            where: { id: createUserDto.roleId },
        });
        if (!role) {
            throw new Error('Role not found');
        }
        const user = this.usersRepository.create({
            email: createUserDto.email,
            password: createUserDto.password,
            role,
        });
        return this.usersRepository.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_service_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map
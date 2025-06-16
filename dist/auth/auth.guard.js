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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const users_service_1 = require("../users/users.service");
const jwt_service_1 = require("../jwt/jwt.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, jwtService, usersService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader)
            throw new common_1.UnauthorizedException('Token no proporcionado');
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Formato de token inválido');
        }
        let payload;
        try {
            payload = this.jwtService.getPayload(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido');
        }
        const user = await this.usersService.findByEmail(payload.email);
        if (!user)
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        request['user'] = user;
        const requiredPermissions = this.reflector.get('permissions', context.getHandler());
        if (!requiredPermissions)
            return true;
        const userPermissions = user.permissionCodes || [];
        const hasPermission = requiredPermissions.every((perm) => userPermissions.includes(perm));
        if (!hasPermission) {
            throw new common_1.ForbiddenException('No tenés permisos suficientes');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_service_1.JwtService,
        users_service_1.UsersService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map
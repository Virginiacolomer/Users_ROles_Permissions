import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { JwtService } from '../jwt/jwt.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Token no proporcionado');

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    let payload: any;
    try {
      payload = this.jwtService.getPayload(token);
    } catch {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.usersService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    request['user'] = user;

    const requiredPermissions = this.reflector.get<string[]>(
  'permissions',
  context.getHandler(),
);

    if (!requiredPermissions) return true;

    const userPermissions = user.permissionCodes || [];
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasPermission) {
      throw new ForbiddenException('No tenés permisos suficientes');
    }

    return true;
  }
}

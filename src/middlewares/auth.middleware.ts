import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from 'src/interfaces/request-user';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';
import { Permissions } from './decorators/permissions.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector:Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: RequestWithUser = context.switchToHttp().getRequest();
      const token = request.headers.authorization.replace('Bearer ','');
      if (token == null) {
        throw new UnauthorizedException('El token no existe');
      }
      const payload = this.jwtService.getPayload(token);
      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = user;

      const requiredPermissions = this.reflector.get(Permissions, context.getHandler());
      if (!requiredPermissions) {
        return true; // No permissions required, allow access
      }

      const hasPermission = () =>
        user.permissionCodes.some((p) => requiredPermissions.includes(p));

      if (!hasPermission()) {
        throw new UnauthorizedException('You do not have permission to access this resource');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message || 'Invalid token');
    }
  }
}

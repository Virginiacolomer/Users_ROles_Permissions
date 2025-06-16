import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { JwtService } from '../jwt/jwt.service';
export declare class AuthGuard implements CanActivate {
    private reflector;
    private jwtService;
    private usersService;
    constructor(reflector: Reflector, jwtService: JwtService, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

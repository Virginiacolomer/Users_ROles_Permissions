import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { RequestWithUser } from 'src/interfaces/request-user';
import { AssignRolesDto } from 'src/interfaces/AssignRoles.dto';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    me(req: RequestWithUser): {
        email: string;
    };
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(body: RegisterDTO): Promise<import("../entities/user.entity").UserEntity>;
    canDo(request: RequestWithUser, permission: string): boolean;
    refreshToken(request: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    assignRole(assignRolesDto: AssignRolesDto): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        role: string;
    }[]>;
}

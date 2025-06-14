import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(email: string, password: string): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
        };
    }>;
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
        role: import("../entities/role.entity").Role;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}

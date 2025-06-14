import { AuthService } from './auth.service';
import { RegisterDTO } from '../interfaces/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(body: RegisterDTO): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
        };
    }>;
}

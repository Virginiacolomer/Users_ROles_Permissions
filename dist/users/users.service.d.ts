import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { AssignRolesDto } from 'src/interfaces/AssignRoles.dto';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
export declare class UsersService {
    private usersRepository;
    private rolesRepository;
    private jwtService;
    constructor(usersRepository: Repository<UserEntity>, rolesRepository: Repository<Role>, jwtService: JwtService);
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    canDo(user: UserEntity, permission: string): boolean;
    register(body: RegisterDTO): Promise<UserEntity>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    findByEmail(email: string): Promise<UserEntity | undefined>;
    assignRoles(assignRoles: AssignRolesDto): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
    findAllUsers(): Promise<{
        id: number;
        email: string;
        role: string;
    }[]>;
}

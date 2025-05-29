import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { AssignRolesDto } from 'src/interfaces/AssignRoles.dto';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateUserDto } from 'src/interfaces/create-user.dto';
export declare class UsersService {
    private usersRepository;
    private rolesRepository;
    private jwtService;
    constructor(usersRepository: Repository<UserEntity>, rolesRepository: Repository<Role>, jwtService: JwtService);
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    canDo(user: UserI, permission: string): boolean;
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    findByEmail(email: string): Promise<UserI | undefined>;
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
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
}

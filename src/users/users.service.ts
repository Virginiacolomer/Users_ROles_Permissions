import {
  HttpException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { AssignRolesDto } from 'src/interfaces/AssignRoles.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { CreateUserDto } from 'src/interfaces/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,

    private jwtService: JwtService,
  ) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  canDo(user: UserI, permission: string): boolean {
    const result = user.permissionCodes.includes(permission);
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

async register(body: RegisterDTO) {
  try {
    const user = new UserEntity();
    user.email = body.email;
    user.password = await bcrypt.hash(body.password, 10);

    await this.usersRepository.save(user);
    return { status: 'created' };
  } catch (error) {
    throw new HttpException('Error de creación', 500);
  }
}

  async login(body: LoginDTO) {
    const user = await this.usersRepository.findOne({
      where: { email: body.email },
      relations: ['role', 'role.permissions'], // si necesitás permisos
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
    };
  }

async findByEmail(email: string): Promise<UserI | undefined> {
  return this.usersRepository.findOne({ where: { email } });
}


  async assignRoles(assignRoles: AssignRolesDto) {
    const user = await this.usersRepository.findOne({
      where: { id: assignRoles.userId },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validar y buscar el rol (solo un rol, según tu requisito)
    if (assignRoles.roleIds.length !== 1) {
      throw new Error('Solo un rol puede ser asignado por usuario');
    }

    const roleId = assignRoles.roleIds[0];
    const role = await this.rolesRepository.findOneBy({ id: roleId });
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found`);
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

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
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
}

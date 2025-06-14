import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { AuthGuard } from '../middlewares/auth.middleware';
import { RequestWithUser } from 'src/interfaces/request-user';
import { AssignRolesDto } from 'src/interfaces/AssignRoles.dto';
import { CreateUserDto } from 'src/interfaces/create-user.dto';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard)
  @Permissions(['myEmail'])
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return { email: req.user.email };
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  @UseGuards(AuthGuard)
  @Permissions(['user-create'])
  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }

  @UseGuards(AuthGuard)
  @Permissions(['verify-permission'])
  @Get('can-do/:permission')
  canDo(@Req() request: RequestWithUser, @Param('permission') permission: string) {
    return this.service.canDo(request.user, permission);
  }

  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.service.refreshToken(request.headers['refresh-token'] as string);
  }

  @Post('assign-role')
  @UseGuards(AuthGuard)
  @Permissions(['role-assign'])
  assignRole(@Body() assignRolesDto: AssignRolesDto) {
    return this.service.assignRoles(assignRolesDto);
  }

  @Get('users')
  @UseGuards(AuthGuard)
  @Permissions(['all-users'])
  async findAll() {
    return this.service.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @Permissions(['user-create'])
  @Post('register-user')
  async create(@Body() createUserDto: CreateUserDto) {
  return this.service.create(createUserDto);
}
}
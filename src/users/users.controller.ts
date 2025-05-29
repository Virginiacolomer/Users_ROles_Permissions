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

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return { email: req.user.email };
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('can-do/:permission')
  canDo(@Req() request: RequestWithUser, @Param('permission') permission: string) {
    return this.service.canDo(request.user, permission);
  }

  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.service.refreshToken(request.headers['refresh-token'] as string);
  }

  @Post('assign-role')
  assignRole(@Body() assignRolesDto: AssignRolesDto) {
    return this.service.assignRoles(assignRolesDto);
  }

  @Get('users')
  async findAll() {
    return this.service.findAllUsers();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
  return this.service.create(createUserDto);
}
}
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from '../interfaces/create-role.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { AuthGuard } from '../auth/auth.guard';


@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Permissions(['roles-create'])
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Permissions(['all-roles'])
  findAll() {
    return this.rolesService.findAll();
  }
}

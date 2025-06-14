import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from '../interfaces/create-role.dto';
import { AuthGuard } from '../middlewares/auth.middleware';
import { Permissions } from '../middlewares/decorators/permissions.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(['roles-create'])
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(['all-roles'])
  findAll() {
    return this.rolesService.findAll();
  }
}

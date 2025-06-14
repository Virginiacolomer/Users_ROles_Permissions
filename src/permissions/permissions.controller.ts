import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from '../interfaces/create-permission.dto';
import { AuthGuard } from '../middlewares/auth.middleware';
import { Permissions } from '../middlewares/decorators/permissions.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(['permissions-create'])
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(['all-permissions'])
  findAll() {
    return this.permissionsService.findAll();
  }
}

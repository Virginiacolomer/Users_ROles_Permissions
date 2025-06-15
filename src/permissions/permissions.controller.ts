import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from '../interfaces/create-permission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../middlewares/decorators/permissions.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Permissions(['permissions-create'])
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Permissions(['all-permissions'])
  findAll() {
    return this.permissionsService.findAll();
  }
}

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
  @Permissions(['permissions_create'])
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }
}

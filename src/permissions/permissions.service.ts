import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreatePermissionDto } from '../interfaces/create-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,

    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    // Validar que los roles existen en BD
    const roles = await this.rolesRepository.findByIds(createPermissionDto.roleIds);
    if (roles.length !== createPermissionDto.roleIds.length) {
      throw new NotFoundException('One or more roles not found');
    }

    // Crear permiso y asignar roles
    const newPermission = this.permissionsRepository.create({
      name: createPermissionDto.name,
      description: createPermissionDto.description,
      roles: roles,
    });

    try {
      return await this.permissionsRepository.save(newPermission);
    } catch (error) {
      throw new HttpException('Error creating permission', 500);
    }
  }

  async findAll() {
  const permissions = await this.permissionsRepository
    .createQueryBuilder('permission')
    .leftJoinAndSelect('permission.roles', 'role')
    .getMany();

  // Mapear para dejar solo los IDs de roles
  return permissions.map(permission => ({
    id: permission.id,
    name: permission.name,
    description: permission.description,
    roles: permission.roles.map(role => role.id), // <--- Solo IDs
  }));
}

}


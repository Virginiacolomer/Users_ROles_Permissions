import { Injectable, HttpException } from '@nestjs/common';
import { CreateRoleDto } from '../interfaces/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const existing = await this.rolesRepository.findOneBy({ name: createRoleDto.name });
    if (existing) {
      throw new HttpException('Role already exists', 400);
    }

    const newRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(newRole);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }
}

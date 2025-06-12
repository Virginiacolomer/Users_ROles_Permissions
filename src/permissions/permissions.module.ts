import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { UsersModule } from '../users/users.module';

@Module({
imports: [TypeOrmModule.forFeature([Permission, Role]), JwtAuthModule, UsersModule],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [PermissionsService], 
})
export class PermissionsModule {}

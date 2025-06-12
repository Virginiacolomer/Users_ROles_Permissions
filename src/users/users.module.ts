import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { JwtAuthModule } from '../jwt/jwt-auth.module';

@Module({
imports: [TypeOrmModule.forFeature([UserEntity, Role]), JwtAuthModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

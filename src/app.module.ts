import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // lo hace accesible en toda la app sin volver a importar
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5441,
      username: 'postgres',
      password: 'mipassword',
      database: 'users_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AuthGuard, JwtService],
})
export class AppModule {}

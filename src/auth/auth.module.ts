import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'TU_SECRETO_SEGURO', // idealmente sacarlo a una env var
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

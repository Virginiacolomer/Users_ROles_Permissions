import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('El email ya está registrado');
    }

    const user = await this.usersService.register({ email, password });

    return {
      message: 'Usuario registrado correctamente',
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }


  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.email, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

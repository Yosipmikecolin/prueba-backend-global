import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException('No se proporciona ningún token');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      req.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token no válido o caducado');
    }
  }
}

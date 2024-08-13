import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    _context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('El token a expirado');
      } else {
        throw new UnauthorizedException('Token invalido');
      }
    }
    return user;
  }
}

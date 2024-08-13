import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
        active: true,
      },
    });

    if (!user) {
      throw new NotAcceptableException('usuario no existente');
    }
    return user;
  }

  async findUserById(userId: bigint): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }
}

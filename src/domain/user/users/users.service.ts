import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/configuration/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: {
        Email: email,
      },
    });

    // return {
    //   UserID: 1,
    //   Email: 'dodo@gmail.com',
    //   Name: 'Dodo',
    //   Role: Role.ADMIN,
    //   Password: '123456',
    //   Prefix: 'Mr.',
    //   Bio: 'test',
    //   Faculty: 'วิศวกรรมศาสตร์',
    //   Course: 'คอมพิวเตอร์',
    //   PhoneNumber: '0812345678',
    // };
  }
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

}

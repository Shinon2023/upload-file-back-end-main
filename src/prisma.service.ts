import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  [x: string]: any;
  async onModuleInit() {
    await this.$connect();
  }

  async createUser(data: any) {
    return prisma.users.create({ data });
  }

  async findUniqueUser(where: any) {
    return prisma.users.findUnique({ where });
  }
}

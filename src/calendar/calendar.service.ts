import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/configuration/prisma/prisma.service';
// import { submitDate } from '@prisma/client';
@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.submitDate.findMany();
  }
}

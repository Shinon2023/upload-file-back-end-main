import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateFormsDto } from './dto/create-forms.dto';
import { PrismaService } from 'src/configuration/prisma/prisma.service';
import { userSession } from '../users/entities/user.session';

@Injectable()
export class FormsService {
  private readonly logger = new Logger(FormsService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateFormsDto,
    userSession: userSession,
    files: Express.Multer.File[],
  ) {
    // Convert userId and level to numbers
    const userId = userSession.id;
    const level = Number(data.level);
    // Verify if the user exists
    const user = await this.prisma.users.findUnique({
      where: { UserID: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    // Prepare file paths
    // const filePaths = files.map((file) => file.path);

    // Create the form associated with the user
    return this.prisma.form.create({
      data: {
        level: level,
        user: { connect: { UserID: userId } },
        UploadFile: {
          create: {
            File: {
              create: files.map(({ path }) => ({
                fileName: path,
              })),
            },
          },
        },
      },
    });
  }

  async findByYear(year: number) {
    const forms = await this.prisma.form.findMany({
      where: {
        submitDate: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
      include: {
        user: true,
      },
    });

    return forms;
  }

  async findByUser(userId: number) {
    return this.prisma.form.findMany({
      where: {
        user: {
          UserID: userId,
        },
      },
      include: {
        UploadFile: {
          include: {
            File: true,
          },
        },
      },
    });
  }
}

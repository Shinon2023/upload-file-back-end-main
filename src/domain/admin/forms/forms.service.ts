import { Injectable } from '@nestjs/common';
import { Form } from '@prisma/client';
import { PrismaService } from 'src/configuration/prisma/prisma.service';

@Injectable()
export class FormsService {
  constructor(private readonly prisma: PrismaService) {}

  getForm(formId: string): Promise<Form | null> {
    return this.prisma.form.findUnique({
      where: {
        id: formId,
      },
    });
  }

  getForms(): Promise<Form[] | null> {
    return this.prisma.form.findMany({
      include: {
        user: {
          select: {
            Email: true,
            Name: true,
            Role: true,
            Prefix: true,
            Bio: true,
            Faculty: true,
            Course: true,
            PhoneNumber: true,
          },
        },
        UploadFile: {
          include: {
            File: true,
          },
        },
      },
    });
  }

  getAnalytics(year: string): Promise<any | null> {
    // return Promise.all([this.getFormCountByMonth(year,'09')]);
    const queryMonth = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      return this.getFormCountByMonth(year, month.toString().padStart(2, '0'));
    });
    return Promise.all([...queryMonth]);
  }

  private getFormCountByMonth(
    year: string,
    month: string,
  ): Promise<any | null> {
    return this.prisma.form.aggregate({
      _count: {
        _all: true, // Count total submissions
      },
      where: {
        submitDate: {
          gte: new Date(`${year}-${month}-01`),
          lte: new Date(`${year}-${month}-31`),
        },
      },
    });
  }
}

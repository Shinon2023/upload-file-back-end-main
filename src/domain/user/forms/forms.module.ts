import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { PrismaModule } from 'src/configuration/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads', // Specify the directory for file storage
        filename: (req, file, cb) => {
          const userId = (req.session as any)?.passport?.user?.id; //ใช้ session id ในการหา user แทน
          // Generate a unique filename with the original extension
          const uniqueSuffix = `${userId}-${file.fieldname}${extname(file.originalname)}`;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}

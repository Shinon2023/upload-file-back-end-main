// pdf-upload/pdf-upload.controller.ts
import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { PdfUploadService } from './pdf-upload.service';
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import { join } from 'path';
  
  @Controller('upload-pdf')
  export class PdfUploadController {
    constructor(private readonly pdfUploadService: PdfUploadService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('pdfFile', {
      storage: diskStorage({
        destination: './uploads', // เปลี่ยนพาธเป็น './uploads'
        filename: (req, file, cb) => {
          const uniqueSuffix = `${uuidv4()}-${file.originalname}`;
          cb(null, uniqueSuffix); // ใช้ชื่อไฟล์ที่ไม่ซ้ำกัน
        },
      }),
    }))
    async uploadPdf(@UploadedFile() file: Express.Multer.File) {
      return this.pdfUploadService.uploadPdf(file);
    }
  }
  
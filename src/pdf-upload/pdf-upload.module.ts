import { Module } from '@nestjs/common';
import { PdfUploadService } from './pdf-upload.service';
import { PdfUploadController } from './pdf-upload.controller';


@Module({
    controllers: [PdfUploadController],
    providers: [PdfUploadService],
    exports: [PdfUploadService],
})
export class PdfUploadModule {}

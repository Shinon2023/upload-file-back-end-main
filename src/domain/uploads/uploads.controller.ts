import {
  Controller,
  Get,
  Logger,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('uploads')
export class UploadsController {
  private readonly logger = new Logger(UploadsController.name);
  constructor(private readonly uploadsService: UploadsService) {}

  @Get(':file')
  getFile(@Param('file') fileName: string, @Res() res: Response) {
    // if perfect `/uploads` cloud be change to configService file
    const filePath = join(process.cwd(), '/uploads', fileName);
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    const file = createReadStream(filePath);
    file.pipe(res as any);
    // return new StreamableFile(file);
  }
}

// pdf-upload/pdf-upload.service.ts
import { Injectable } from '@nestjs/common';
// Import pdf-parse in the correct way
import * as pdf from 'pdf-parse'; // Use this form for importing commonjs modules in TypeScript
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class PdfUploadService {
  async uploadPdf(file: Express.Multer.File): Promise<{ text: string }> {
    if (!file || !file.filename) {
      throw new Error('File not found or filename is undefined');
    }

    try {
      const filePath = join(process.cwd(), 'uploads', file.filename); // Correct path for the file
      const dataBuffer = await fs.readFile(filePath);

      // Ensure pdf-parse is used correctly
      const pdfData = await pdf(dataBuffer);
      await fs.unlink(filePath); // Remove file after processing

      return { text: pdfData.text };
    } catch (error) {
      console.error('Error processing PDF file:', error.message);
      throw new Error('Error processing PDF file');
    }
  }
}

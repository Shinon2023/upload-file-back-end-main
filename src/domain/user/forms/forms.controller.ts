import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Logger,
  Req,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormsDto } from './dto/create-forms.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
import { RolesGuard } from 'src/configuration/roles/roles.guard';
import { AuthenticatedGuard } from 'src/configuration/auth/authenticated.guard';
import { Roles } from 'src/configuration/roles/roles.decorator';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { userSession } from '../users/entities/user.session';

@UseGuards(RolesGuard)
@Controller('users/forms')
export class FormsController {
  private readonly logger = new Logger(FormsController.name);
  constructor(private readonly formsService: FormsService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.USER)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
      { name: 'file3', maxCount: 1 },
      { name: 'file4', maxCount: 1 },
      { name: 'file5', maxCount: 1 },
    ]),
  )
  async createForm(
    @Body() createFormsDto: CreateFormsDto,
    @Req() req: Request,
    @UploadedFiles() files: { [key: string]: Express.Multer.File[] },
  ) {
    const fileArray = Object.values(files).map((file) => file[0]); // get file index 0
    // const userProfile = (req.session as any)?.passport?.user as userSession;
    const userProfile: userSession = req.user as userSession;
    return this.formsService.create(createFormsDto, userProfile, fileArray);
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.USER)
  @Get(':year')
  async findFormByYear(@Param('year') year: string) {
    return this.formsService.findByYear(parseInt(year, 10));
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.USER)
  @Get('byUser/:id')
  async findFormByUser(@Req() req: Request) {
    const userProfile: userSession = req.user as userSession;
    return this.formsService.findByUser(userProfile.id);
  }
}

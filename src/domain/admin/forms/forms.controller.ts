import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FormsService } from './forms.service';
import { RolesGuard } from 'src/configuration/roles/roles.guard';
import { Roles } from 'src/configuration/roles/roles.decorator';
import { Role } from '@prisma/client';
import { AuthenticatedGuard } from 'src/configuration/auth/authenticated.guard';

@UseGuards(RolesGuard)
@Controller()
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  @Get(':formId')
  getForm(@Param('formId') formId: string): any {
    return this.formsService.getForm(formId);
  }


  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  @Get()
  getForms() {
    return this.formsService.getForms();
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  @Get('analytics/:year')
  getAnalytics(@Param('year') year: string) {
    return this.formsService.getAnalytics(year);
  }
}

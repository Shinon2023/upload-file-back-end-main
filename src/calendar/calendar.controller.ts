import { Controller, Get } from '@nestjs/common';
// import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  findAll() {
    return this.calendarService.findAll();
  }
}

import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LocalAuthGuard } from 'src/configuration/auth/local.auth.guard';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  login(@Req() req): any {
    return { User: req.user, msg: 'Admin logged in' };
  }
}

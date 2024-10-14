import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/configuration/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/configuration/auth/authenticated.guard';
import { RolesGuard } from 'src/configuration/roles/roles.guard';
import { Roles } from 'src/configuration/roles/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Post('/signup')
  // async addUser(
  //   @Body('password') userPassword: string,
  //   @Body('username') userName: string,
  // ) {
  // const saltOrRounds = 10;
  // const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
  // const result = await this.usersService.insertUser(userName, hashedPassword);
  // return {
  //   msg: 'User successfully registered',
  //   userId: result.id,
  //   userName: result.username,
  // };
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  login(@Request() req): any {
    return { User: req.user, msg: 'User logged in' };
  }

  @UseGuards(AuthenticatedGuard)
  @Roles(Role.USER)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'User logged out' };
  }

}

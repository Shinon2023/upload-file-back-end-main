import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/domain/user/users/users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
// import { Request } from 'express-session';

import { Session, SessionData } from 'express-session';
import { userSession } from 'src/domain/user/users/entities/user.session';

declare module 'express' {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<userSession> {
    const user = await this.userService.findByEmail(email);
    const passwordMath: boolean = await this.passwordMath(
      password,
      user.Password,
    );
    if (!passwordMath || !user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      id: user.UserID,
      email: user.Email,
      name: user.Name,
      role: user.Role,
    };
  }

  async passwordMath(password: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  async login(): Promise<any> {
    return {
      message: 'Login success',
      statusCode: HttpStatus.OK,
    };
  }

  async logout(@Req() request: Request): Promise<any> {
    request.session.destroy(() => {
      return {
        message: 'Logout success',
        statusCode: HttpStatus.OK,
      };
    });
  }
  create(createAuthDto: CreateAuthDto) {
    console.log(createAuthDto);
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    console.log(updateAuthDto);
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

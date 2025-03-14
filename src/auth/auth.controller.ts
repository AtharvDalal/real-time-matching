/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('register')
  register(@Body() body) {
    return this.authServices.register(
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }
  @Post('login')
  login(@Body() body) {
    return this.authServices.login(body.email, body.password);
  }
}

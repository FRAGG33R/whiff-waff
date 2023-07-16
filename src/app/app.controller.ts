import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UsersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

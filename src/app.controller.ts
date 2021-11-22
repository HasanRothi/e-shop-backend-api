import { Controller, Get,Param,Post,Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('me')
  addUser(@Body('name')userName , @Body('gmail')userGmail): {} {
    return this.appService.addUser(userName,userGmail)
  }
}

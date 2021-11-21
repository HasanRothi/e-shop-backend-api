import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getGuest(name :String): {} {
    return {
      message: 'Welcome ' + name
    }
  }
  addUser(name : String , mail : String): {} {
    return {
      name,
      mail
    }
  }
}

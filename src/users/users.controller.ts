import { Controller, Get, Post, Body, Patch, Param, Delete,Res, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService : JwtService
    ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto,@Res({passthrough: true}) response : Response) {
    const data = await this.usersService.signup(createUserDto)
    if(data) {
      const gmail = createUserDto.email
      const jwt = await this.jwtService.signAsync({gmail})
      response.cookie('token', jwt,{httpOnly: true})
      return data;
    } else {
      throw new Error('Signup failed')
    }
  }

  @Post('login')
  async login(@Body('email')email,@Body('password')password,@Res({passthrough: true}) response : Response) {
    const data = await this.usersService.login(email,password)
    if(data) {
    const jwt = await this.jwtService.signAsync({email})
    response.cookie('token', jwt,{httpOnly: true})
    return data;
    } else {
      throw new Error('Login failed')
    }
  }
  @Post('logout')
  async logout(@Body('email')email,@Body('password')password,@Res({passthrough: true}) response : Response) {
    const data = await this.usersService.logout(email,password)
    if(data) {
    response.cookie('token','',{httpOnly: true , maxAge: 0})
    return data;
    } else {
      throw new Error('Logout failed')
    }
  }
  @Post('buy')
  async buy(@Body('products')products : []) {
    return this.usersService.buy(products)
  }
}

import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>) {}

  async signup(createUserDto: CreateUserDto ) {
    createUserDto.password = await bcrypt.hash(createUserDto.password,12)
    const user = new this.userModel(createUserDto)
    const data = await user.save()
    return data
  }

  async login(email,pass) {
    const user = await this.userModel.find({email})
    if(!user) {
      throw new BadRequestException('try again')
    }
    if(!await bcrypt.compare(pass, user[0].password)) {
      throw new BadRequestException('try again')
    }
    const {password , ...rest} = user[0]
    return {
      data: rest
    };
  }
}

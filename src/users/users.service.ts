import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Product') private readonly ProductModel : Model<Product>
    ) {}

  async signup(createUserDto: CreateUserDto ) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password,12)
    const user = new this.userModel(createUserDto)
    const data = await user.save()
    return data
    } catch (error) {
      throw new BadRequestException('User already exist')
    }
  }

  async login(email,pass) {
    const user = await this.userModel.findOneAndUpdate({email},{loginStatus: true})
    if(!user) {
      throw new BadRequestException('try again')
    }
    if(!await bcrypt.compare(pass, user.password)) {
      throw new BadRequestException('try again')
    }
    const {name} = user
    return {
      data: {
        name,
        message: "Login success"
      }
    };
  }
  async logout(email,pass) {
    const user = await this.userModel.findOneAndUpdate({email},{loginStatus: false})
    if(!user) {
      throw new BadRequestException('try again')
    }
    if(!await bcrypt.compare(pass, user.password)) {
      throw new BadRequestException('try again')
    }
    const {name} = user
    return {
      data: {
        name,
        message: "Logout success"
      }
    };
  }
  async buy (products) {
    try {
     await this.ProductModel.updateMany({_id : { $in : products}},{$inc : { quantity : -1} } , { multi: true})
      return {
        message: "Thanks for shop us",
      }
    } catch (error) {
      throw new Error('Invalid product')
    }
  }
}


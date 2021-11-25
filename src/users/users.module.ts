import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
//schema
import { UserSchema } from './entities/user.entity'
import { ProductSchema } from '../products/entities/product.entity'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name: 'Product', schema: ProductSchema}]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: process.env.JWT_EXPIRE_IN}
    })
],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

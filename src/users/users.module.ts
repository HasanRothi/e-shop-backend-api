import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

//schema
import { UserSchema } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn: '1h'}
    })
],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

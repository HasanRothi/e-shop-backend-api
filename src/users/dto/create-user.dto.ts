import { IsNotEmpty, Length , IsEmail } from "class-validator"
export class CreateUserDto {
    @IsNotEmpty({message:'User name required'})
    name: String

    @IsEmail()
    email: String

    @IsNotEmpty()
    @Length(6,10)
    password: String
}

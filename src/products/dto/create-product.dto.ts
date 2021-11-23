import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, Length } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty({message: "Provide product name"})
    @Length(3,255)
    title: String
    @IsOptional()
    description: String
    @IsNumber()
    price: Number
}
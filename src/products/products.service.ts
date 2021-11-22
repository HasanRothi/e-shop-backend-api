import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity'
@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}
  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto)
    const result = await product.save()
    return result;
  }

  async findAll(page, count) {
    const skip = page > 0 ? ( ( page - 1 ) * count ) : 0
    return await this.productModel.find().sort({createdAt: -1}).skip(skip).limit(count);
  }

  async findOne(id: string) {
    return await this.productModel.findById(id)
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    console.log(id)
    return await this.productModel.findByIdAndUpdate(id,updateProductDto,{
      new: true
    }) ;
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}

import * as mongoose from 'mongoose'
export const ProductSchema = new mongoose.Schema({
    title : { type: String , required: true },
    description : String,
    price : { type: Number , required: true },
    quantity: {type: Number , required : true},
    status: { type: Boolean }
},{ timestamps: true })
export interface Product {
    id: String,
    title: String,
    description?:String,
    price: Number,
    // quantity: Number,
    status: Boolean
}

import * as mongoose from 'mongoose'
export const UserSchema = new mongoose.Schema({
    name : { type: String , required: true },
    email : { type: String , required: true , unique: true },
    password : { type: String , required: true },
    loginStatus : { type: Boolean },
},{ timestamps: true })
export interface User {
    id: String,
    name: String,
    email:String,
    password: String,
    accessToken: String,
    refreshToken: String
}

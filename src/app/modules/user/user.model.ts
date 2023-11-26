import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, TUserName } from './user.interface';

const fullNameSchema = new Schema<TUserName>({
    firstName: {type: String, required: true,},
    lastName: {type: String, required: true}
})

const addressSchema = new Schema<TAddress>({
    city: {type: String, required: true},
    street: {type: String, required: true},
    country: {type: String, required: true}
})
const ordersSchema = new Schema<TOrders>([
    {
        productName: {type: String},
        price: {type: Number},
        quantity: {type: Number}
    }
])

const userSchema = new Schema<TUser>({
    userId: {type: Number, required: true, unique: true},
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: fullNameSchema,
    age: {type: Number, required: true},
    email: {type: String, required: true},
    isActive: {type: Boolean, required: true},
    hobbies: {type: [String], required: true},
    address:addressSchema,
    orders: ordersSchema,
})

export const user = model<TUser>('user',userSchema)
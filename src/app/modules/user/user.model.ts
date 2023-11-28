import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, TUserName } from './user.interface';

const fullNameSchema = new Schema<TUserName>({
    firstName: {type: String, required: [true, 'first name is required'],},
    lastName: {type: String, required: [true, 'last name is required']}
})

const addressSchema = new Schema<TAddress>({
    city: {type: String, required: [true, 'city is required']},
    street: {type: String, required: [true, 'street is required']},
    country: {type: String, required: [true, 'country is required']}
})
const ordersSchema = new Schema<TOrders>([
    {
        productName: {type: String},
        price: {type: Number},
        quantity: {type: Number}
    }
])

const userSchema = new Schema<TUser>({
    userId: {type: Number, required: [true, 'user id is required'], unique: true},
    userName: {type: String, required: [true, 'userName is required'], unique: true},
    password: {type: String, required: [true, 'password is required']},
    fullName: fullNameSchema,
    age: {type: Number, required: [true, 'age is required']},
    email: {type: String, required: [true, 'email is required']},
    isActive: {type: Boolean, required: true,},
    hobbies: {type: [String], required: [true, 'hobbies is required']},
    address:{type: addressSchema},
    orders: {type: ordersSchema},
})

export const user = model<TUser>('user',userSchema)
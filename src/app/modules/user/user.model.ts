import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'
import { TAddress, TOrders, TUser, TUserName } from './user.interface';
import config from '../../config';

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

userSchema.pre('save', async function(next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round))
    next()
})

userSchema.post('save', function(doc,next){
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    doc.set("password", undefined)
    next()
})

 userSchema.post('find', function(doc,next){
      const [users] = doc
      users.password = undefined
     next()
 })

export const user = model<TUser>('user',userSchema)
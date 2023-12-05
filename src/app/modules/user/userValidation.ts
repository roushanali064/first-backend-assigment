import z from 'zod'

const userNameValidationSchema = z.object({
    firstName: z.string().min(1,{message: 'First name is required'}),
    lastName: z.string().min(1,{message: 'Last name is required'})
})

const addressValidationSchema = z.object({
    city: z.string().min(1,{message: 'city is required'}),
    street: z.string().min(1,{message: 'street is required'}),
    country: z.string().min(1,{message: 'country is required'}),
})

const userValidationSchema = z.object({
    userId: z.number().min(1,{message: 'user id is required'}),
    username: z.string().min(1,{message: 'userName is required'}),
    password: z.string().min(5,{message: 'password is required and minimum 5 character'}),
    fullName: userNameValidationSchema,
    age: z.number().min(1, {message: 'age is required'}),
    email: z.string().email({message: 'this is not valid il'}),
    hobbies: z.array(z.string().min(1,{message: 'hobbies is required'})),
    isActive: z.boolean(),
    address: addressValidationSchema,
    orders: z.array(z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number()
    })).optional()
})

export default userValidationSchema
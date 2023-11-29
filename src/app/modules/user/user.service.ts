import { TOrders, TUser } from "./user.interface";
import { user } from "./user.model";

// create user
const createUserIntoDB = (userData: TUser)=>{
    
    const result = user.create(userData);
    return result;
}

// get all user
const allUsers = ()=>{
    const result = user.find({},{password:0, orders: 0});
    return result;
}

// get single user
const singleUser = (userId: string) =>{
    const result = user.findOne({userId},{password:0, orders: 0})
    return result
}

// update user
const updateUserIntoDB = (updateData: TUser, userId: string) =>{
    const result = user.findOneAndUpdate({userId},updateData,{projection:{password:0, orders:0}})
    return result
}

// delete user
const deleteUserIntoDB = (userId: string) =>{
    const result = user.deleteOne({userId})
    return result
}
// add order into db
const addOrderIntoDB = async (userId: string, orders: TOrders) =>{
    const isUserExists = await user.findOne({userId})
    let result;
    if(isUserExists?.orders){
        result = await user.findOneAndUpdate({userId},{$push:{orders}})
    }else{
        result = await user.findOneAndUpdate({userId},{
            $addToSet:{orders}
        })
    }
    return result
}

// retrieve all orders
const allOrdersIntoDB =async (userId:string) => {
    const result = await user.findOne({$and:[{userId},{orders:{$ne: []}}]},{orders:1,_id: 0})
    if(result && result.orders){
        return result
    }else{
        return "You don't order anything"
    }
}

const totalPriceIntoDb =async (userId:string) => {
    const result = await user.aggregate(
        // pipeline 1
        [
            // stage 1
            {
                $match: {
                    userId: Number(userId),
                    orders: {$ne: []}
                }
            },
            // stage 2
            {
                $unwind:'$orders'
            },
            // stage 3
            {
                $group:{
                    _id: '_id',
                    totalPrice:{
                        $sum:{$multiply:['$orders.price','$orders.quantity']}
                    }
                }
            },
            // stage 4
            {
                $project:{_id: 0, totalPrice: 1}
            }

        ]
    )
    return result
}

export const userService = {
    createUserIntoDB,
    allUsers,
    singleUser,
    updateUserIntoDB,
    deleteUserIntoDB,
    addOrderIntoDB,
    allOrdersIntoDB,
    totalPriceIntoDb
}
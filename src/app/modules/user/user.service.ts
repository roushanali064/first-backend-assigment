import { TUser } from "./user.interface";
import { user } from "./user.model";

// create user
const createUserIntoDB = (userData: TUser)=>{
    
    const result = user.create(userData);
    return result;
}

// get all user
const allUsers = ()=>{
    const result = user.find({},{password:0});
    return result;
}

// get single user
const singleUser = (userId: string) =>{
    const result = user.findOne({userId},{password:0})
    return result
}

// update user
const updateUserIntoDB = (updateData: TUser, userId: string) =>{
    const result = user.findOneAndUpdate({userId},updateData,{password:0})
    return result
}

export const userService = {
    createUserIntoDB,
    allUsers,
    singleUser,
    updateUserIntoDB
}
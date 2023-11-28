import { TUser } from "./user.interface";
import { user } from "./user.model";

const createUserIntoDB = (userData: TUser)=>{
    
    const result = user.create(userData);
    return result;
}

const allUsers = ()=>{
    const result = user.find();
    return result;
}

export const userService = {
    createUserIntoDB,
    allUsers
}
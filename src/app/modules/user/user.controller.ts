import { Request, Response } from "express";
import { userService } from "./user.service";
import userValidationSchema from "./userValidation";

// create user
const createUser = async (req: Request, res: Response)=>{
    try{
        const userData = req.body
        const zodParseData = userValidationSchema.parse(userData)
        const result = await userService.createUserIntoDB(zodParseData)
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
          })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:'something went wrong',
            error: err,
          });
    }
}

// find all user
const findAllUsers = async (req: Request, res: Response) =>{
    try{
        const result = await userService.allUsers();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
          })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:'something went wrong',
            error: err,
          });
    }

}

// find single user
const findSingleUser = async (req:Request, res: Response) =>{
    try{
        const {userId} = req.params
        const result = await userService.singleUser(userId);
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
          })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:'something went wrong',
            error: err,
          });
    }
}

export const userController = {
    createUser,
    findSingleUser,
    findAllUsers
}
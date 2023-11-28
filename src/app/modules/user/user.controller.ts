import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response)=>{
    try{
        const userData = req.body
        const result = await userService.createUserIntoDB(userData)
        res.status(200).json({
            success: true,
            message: 'student is create successfully',
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
    createUser
}
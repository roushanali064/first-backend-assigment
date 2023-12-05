import { Request, Response } from 'express';
import { userService } from './user.service';
import userValidationSchema from './userValidation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = userValidationSchema.parse(userData);
    const result = await userService.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// find all user
const findAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.allUsers();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// find single user
const findSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.singleUser(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const { userId } = req.params;
    const result = await userService.updateUserIntoDB(updateData, userId);
    if (result) {
        res.status(200).json({
          success: true,
          message: 'User updated successfully',
          data: result,
        });
      } else{
        res.status(404).json({
            success: false,
            message: 'user not found',
            error: {
              code: 404,
              description: 'User not found!',
            },
          });
      }
    } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

// delete user
const deleteUSer = async (req: Request, res: Response) =>{
  try{
    const {userId} = req.params;
    const result = await userService.deleteUserIntoDB(userId)
    
    if(result.deletedCount === 1){
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data : null
      })
    }else{
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    
  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
}

// add order
const addOrder = async (req: Request, res: Response) =>{
  try{
    const {userId} = req.params;
    const orderData = req.body;
    const result = await userService.addOrderIntoDB(userId,orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data : null
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }

}

// retrieve all orders
const retrieveAllOrders =async (req:Request, res:Response) => {
  try{
    const {userId} = req.params
    const result = await userService.allOrdersIntoDB(userId)
    
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data : result
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
  
}

// total price
const totalPrice =async (req:Request, res:Response) => {
  try{
    const {userId} = req.params;
    const result = await userService.totalPriceIntoDb(userId);
    console.log(result);
    if(result.length > 0){
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data : result[0]
      })
    }else{
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data : {totalPrice:0}
      })
    }
  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
}

export const userController = {
  createUser,
  findSingleUser,
  findAllUsers,
  updateUser,
  deleteUSer,
  addOrder,
  retrieveAllOrders,
  totalPrice
};

import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser)
router.get('/', userController.findAllUsers)
router.get('/:userId', userController.findSingleUser)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUSer)
router.put('/:userId/orders', userController.addOrder)
router.get('/:userId/orders', userController.retrieveAllOrders)

export const userRoute = router;
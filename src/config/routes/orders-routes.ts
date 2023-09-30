//External
import {Router} from 'express';
import { createOrderController } from '../../controllers/orders.controller';
//Const-vars
export const ordersRouter = Router();

ordersRouter.post(
    "/create-order",
    createOrderController
);

// ordersRouter.get(
//     "/create-order/:id",
//     getOrderController
// );

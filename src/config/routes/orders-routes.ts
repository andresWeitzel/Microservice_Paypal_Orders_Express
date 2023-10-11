//External
import {Router} from 'express';
import { createOrderController, getOrderController } from '../../controllers/orders.controller';
//Const-vars
export const ordersRouter = Router();

ordersRouter.post(
    "/create-order",
    createOrderController
);

ordersRouter.get(
    "/get-order/:id",
    getOrderController
);

//External
import {Router} from 'express';
import { createOrderController, getOrderController, updateOrderController } from '../../controllers/orders.controller';
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

ordersRouter.patch(
    "/update-order/:id",
    updateOrderController
);

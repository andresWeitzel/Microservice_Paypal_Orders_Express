//External
import {Router} from 'express';
//Controllers
import { createOrderController } from '../../controllers/orders/create.controller';
import { getOrderController } from '../../controllers/orders/get.controller';
import { updateOrderController } from '../../controllers/orders/update.controller';
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

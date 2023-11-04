//External
import { Router } from "express";
//Controllers
import { createOrderController } from "../../controllers/orders/create.controller";
import { getOrderController } from "../../controllers/orders/get.controller";
import { updateOrderController } from "../../controllers/orders/update.controller";
import { confirmOrderController } from "../../controllers/orders/confirm.controller";
import { authorizePaymentOrderController } from "../../controllers/orders/authorize-payment.controller";
//Const-vars
export const ordersRouter = Router();

ordersRouter.post("/create", createOrderController);

ordersRouter.get("/get/:id", getOrderController);
//For review
ordersRouter.patch("/update/:id", updateOrderController);

ordersRouter.post("/confirm/:id", confirmOrderController);

//For review
ordersRouter.post("/authorize-payment/:id", authorizePaymentOrderController);

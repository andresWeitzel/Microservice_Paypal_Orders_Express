//External
import {Router} from 'express';
import { getAccessTokenController } from '../../controllers/auth.controller';
//Const-vars
export const authRouter = Router();

authRouter.post(
    "/token",
    getAccessTokenController
);

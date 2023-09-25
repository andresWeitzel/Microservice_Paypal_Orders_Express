//External
import {Router} from 'express';
import { getAccessToken } from '../../controllers/auth.controller';
//Const-vars
export const authRouter = Router();

authRouter.post(
    "/token",
    getAccessToken
);

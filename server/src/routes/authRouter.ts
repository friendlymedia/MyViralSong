import {Router} from 'express';
import authController from '../controllers/authController';
import { authMiddleware,  } from "../auth";

class AuthRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/users',authController.CreateForm);
        this.router.post('/events', authController.CreateForm);
    }
}

const authRouter = new AuthRouter();
export default authRouter.router;
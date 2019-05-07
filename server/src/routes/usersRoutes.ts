import {Router} from 'express';
import usersController from '../controllers/usersController';

class UsersRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',usersController.getAllUsers);
        this.router.get('/:id',usersController.getUserById);
        this.router.post('/',usersController.createUsers);
        this.router.put('/:id',usersController.updateUsers);
        this.router.delete('/:id',usersController.deleteUsers);
    }
}

const usersRouter = new UsersRouter();
export default usersRouter.router;
import { Router } from 'express';
import { eventController } from '../controllers/eventController';

class EventRouter{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',eventController.getAllEvents);
        this.router.get('/:eventscode', eventController.getOne);
        this.router.post('/', eventController.addEvent);
    }
}

const eventRouter = new EventRouter();
export default eventRouter.router;
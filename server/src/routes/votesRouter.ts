import {Router} from 'express';
import { authMiddleware } from "../auth";
import votesController from '../controllers/votesController';

class VotesRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',votesController.getAllVotes);
        this.router.delete('/:songs_id',votesController.deleteVotes);
        this.router.get('/:eventscode/:songs_id',votesController.getVotesByEventcode);
        this.router.post('/', votesController.voteSong);
    }
}

const votesRouter = new VotesRouter();
export default votesRouter.router;
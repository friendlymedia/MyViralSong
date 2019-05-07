import {Router} from 'express';
import songsController from '../controllers/songsController';

class SongsRouter{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',songsController.getAllSongs);
        this.router.get('/:id',songsController.getOne);
        this.router.post('/',songsController.createSongs);
        this.router.put('/:id',songsController.updateSong);
        this.router.delete('/:id',songsController.deleteSongs);
    }
}

const songsRouter = new SongsRouter();
export default songsRouter.router;
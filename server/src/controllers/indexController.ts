import {Request, Response} from 'express';
import  crypto  from 'crypto';

class IndexController{

    public index (req: Request, res: Response){
        res.json({text: 'Welcome'});
    }
}

export const indexController = new IndexController();
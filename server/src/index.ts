import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRouter from './routes/indexRoutes';
import usersRouter from './routes/usersRoutes';
import songsRouter from './routes/songsRouter';
import eventRouter from './routes/eventRouter';
import authRouter from './routes/authRouter';
import votesRouter from './routes/votesRouter';

//here we initialize the server 
class Server{

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
        
    }
    //Configure the properties of the app 
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    //Define Routes
    routes(): void{
        this.app.use('/',indexRouter);
        this.app.use('/api/code',indexRouter);
        this.app.use('/api/songs',songsRouter);
        this.app.use('/api/users',usersRouter);
        this.app.use('/api/events',eventRouter);
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/votes', votesRouter);
    }

    //Start the server
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
            
        });
    }
}

const server = new Server();
server.start();
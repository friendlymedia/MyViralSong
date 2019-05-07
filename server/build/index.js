"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const songsRouter_1 = __importDefault(require("./routes/songsRouter"));
const eventRouter_1 = __importDefault(require("./routes/eventRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const votesRouter_1 = __importDefault(require("./routes/votesRouter"));
//here we initialize the server 
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //Configure the properties of the app 
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //Define Routes
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/code', indexRoutes_1.default);
        this.app.use('/api/songs', songsRouter_1.default);
        this.app.use('/api/users', usersRoutes_1.default);
        this.app.use('/api/events', eventRouter_1.default);
        this.app.use('/api/auth', authRouter_1.default);
        this.app.use('/api/votes', votesRouter_1.default);
    }
    //Start the server
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();

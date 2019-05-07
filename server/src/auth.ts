import * as express from "express";
import * as joi from "joi";
import db from './database';

export interface AuthenticatedRequest extends express.Request {
    userName: number;
    eventname: string;
}

export interface votesContent extends express.Request {
    users_id: number;
    events_id: number;
    songs_id: number;
}

// Middleware function used for votes validation
export async function authMiddleware(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {

    const router = express.Router();

    router.post("/users", );
    router.post("/events");

}

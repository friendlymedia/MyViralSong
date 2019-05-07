import {Request, Response, request} from 'express';
import { userDetailsSchema } from "./usersController";
import db from '../database'
import * as joi from "joi";
import { AuthenticatedRequest } from "../auth";
import { eventSchema } from './eventController';
import { rmdirSync } from 'fs';

class AuthController{
    public async CreateForm (req: Request, res: Response){
        try {
            // Read and validate the user details from the request body
            const userDetails = req.body;
            const eventDetails = req.body;
            const result = joi.validate(userDetails, userDetailsSchema);
            const result1 =joi.validate(eventDetails, eventSchema );
            if (result1.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            } else {
            // Try to find the user with the given credentials
            const users = await db.query('INSERT INTO users set ?',[req.body]);
            const events = await db.query('INSERT INTO events set eventscode = md5(now()), eventname = ?',[req.body]);

            res.json(users)
            res.json(events);
            }
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal Server Error"}).send();
        }
    }

    /*public async votes(req: Request, res: Response){
        try {
            const userId = (req as AuthenticatedRequest).userId;
            //Try to find the user with the given credentials
            const users = await db.query('SELECT * FROM users WHERE id = ?',[userId]);
            res.json(users).send();
        }catch (err) {
            //Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal Server Error"}).send();
        }
    }*/
}

const authController = new AuthController();
export default authController;
import {Request, Response} from 'express';
import db from '../database';
import * as joi from "joi";

export const eventCodeSchema = {
    eventscode: joi.string(),
};

export const eventSchema = {
    eventscode: joi.string(),
    eventname: joi.string(),
    users_id: joi.number(),
};

class EventController{
   public async getAllEvents (req: Request, res: Response){
        try {
            // get all events
            const events = await db.query('SELECT * FROM events');
            res.json(events);
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal Server Error"}).send();
        }
    }

   public async addEvent (req: Request, res:Response){
        try{
            //read and Validate the new event from the request body
            const newEvent = req.body;
            const result = joi.validate(newEvent, eventSchema);
            console.log("result: ")
            console.dir(result);
            if (result.error) {
                res.json({ msg: 'Bad Request'}).status(400).send();
            } else {
                // Save the user into the database
                await db.query('INSERT INTO events set ?,eventscode = md5(now())',[newEvent]);
                res.json({message:'events saved'});
                // events set eventscode = md5(now()), eventname = ?
            }
        }catch(err){
            // handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }

    public async getOne (req: Request, res: Response){
        try {
            //Read and Validate eventscode in URL
            const idStr = req.params;
            const idValidationresult = joi.validate(idStr, eventCodeSchema);
            console.log("idValidationresult: ")
            console.dir(idValidationresult);
            if(idValidationresult.error) {
                res.status(400).json({ error: "Bad request" }).send();
            }{
                //get events by eventscode
                const events = await db.query(
                    'SELECT * FROM events WHERE eventscode = ?',[idStr.eventscode]);
                    console.log("votes: ")
                if (events.length > 0){
                    return res.json(events[0]);
                }
                res.status(404).json({error: "Not found"})
                }
            } catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error"}).send();
        }
    }
}

export const eventController= new EventController();
export default eventController;
import {Request, Response, request} from 'express';
import db from '../database'
import * as joi from "joi";

export const votesIdSchema = {
    users_id: joi.number(),
    eventscode: joi.string(),
    songs_id: joi.number()
    
};

export const eventIdSchema = {
    eventscode: joi.string(),
    songs_id: joi.string(),
};

interface Votes {
    users_id: number;
    eventscode: String,
    songs_id: number;
}

interface eventscode {
    eventscode: number;
}

class VotesController{
    public async getAllVotes(req: Request, res: Response){
        try {
            // get all songs
            const votes = await db.query('SELECT * from votes ');
            res.json(votes);
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }
    public async getVotesByEventcode (req: Request, res: Response){
        try {
            //Read and Validate event_ID in URL
            const idStr = req.params;
            const idValidationresult = joi.validate(idStr, eventIdSchema);
            console.log("idValidationresult: ")
            console.dir(idValidationresult);
            if(idValidationresult.error) {
                res.status(400).json({ error: "Bad request" }).send();
            }{
                //get votes by events
                const votes = await db.query(
                    'SELECT songs_id, eventscode, count(*) AS uservotes FROM votes WHERE eventscode = ? and songs_id = ?',
                    [idStr.eventscode, idStr.songs_id]);
                    console.log("votes: ")
                if (votes.length > 0){
                    return res.json(votes[0]);
                }
                res.status(404).json({error: "Not found"})
                }
            } catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error"}).send();
        }
    }

    public async deleteVotes(req: Request, res: Response){
        try {
            //Read and Validate ID from URL
            const idStr = req.params.songs_id;
            const voteId = {songs_id: parseInt(idStr)};
            const idValidationresult = joi.validate(voteId, votesIdSchema);
            if (idValidationresult.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            }{
            //Delete song from Database
            await db.query('DELETE FROM votes WHERE songs_id = ?',[idStr]);
            res.json({message:'vote deleted'});
            }
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }

    public async voteSong(req: Request, res:Response){
        try {
            //validate user
            /*if ((req as AuthenticatedRequest).users_id === undefined) {
               throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
            }*/
            // Validate the request body
            const newVote = req.body as Votes;
            const idValidationresult = joi.validate( newVote, votesIdSchema);

            if (idValidationresult.error) {
                res.status(400).json({ error: "Bad Request" }).send();     
            }else{
                // Try to find previous vote by same user
                const votes = await db.query('SELECT * FROM  votes WHERE  users_id = ? and eventscode = ? and songs_id = ? LIMIT 1',
                [newVote.users_id, newVote.eventscode, newVote.songs_id])
                //res.status(200).json({message:'success = false'});

                if(votes.length === 1){
                    //if find the vote by same user and the same song, we cannot vote again
                    res.status(403).json({ error: "You have already voted" });
                }else if(votes === undefined || votes.length === 0){
                    //save vote to Database
                    await db.query('INSERT INTO votes set ?',[newVote]);
                    res.json({message:'vote saved'});
                }else{
                    res.status(400).json({error: "bad request" })
                }
            }
        } catch (err) {
            // Handle Unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }


}

const votesController = new VotesController();
export default votesController
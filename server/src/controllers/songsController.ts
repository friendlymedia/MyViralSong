import {Request, Response, request} from 'express';
import db from '../database'
import * as joi from "joi";
import { AuthenticatedRequest } from "../auth";

export const songIdSchema = {
    id: joi.number()
    
};

export const songSchema = {
    title: joi.string(),
    artist: joi.string(),
    genre: joi.string(),
    url: joi.string(),
    eventscode: joi.string(),
};

class SongsController{
    public async getAllSongs (req: Request, res: Response){
        try {
            // get all songs
            const songs = await db.query('SELECT * FROM songs');
            res.json(songs);
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }

    public async getOne (req: Request, res: Response){
        try {
        //Read and Validate ID in URL 
        const idStr = req.params.id;
        const songId = { id: parseInt(idStr) };
        const idValidationresult = joi.validate(songId, songIdSchema);
        if (idValidationresult.error) {
            res.status(400).json({ error: "Bad Request" }).send();
        }{
            //get song by ID
            const songs = await db.query('SELECT * FROM  songs WHERE id = ?',[idStr]);
            if (songs.length > 0){
                return res.json(songs[0]);
            }
            res.status(404).json({error: "Not found"})
            }
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
        
    }

    public async createSongs(req: Request, res: Response){
        try{
            //Read and Validate the new song from the request body
            const newSong = req.body;
            const validationresult = joi.validate(newSong, songSchema);
            if (validationresult.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            } else {
                //create new song to database
                await db.query('INSERT INTO songs set ?',[newSong]);
                res.json({message:'song saved'});
            }
        }catch(err){
            // handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
        
    }

    public async updateSong(req: Request, res:Response){
        try {
            //Read and Validate ID from URL
            const idStr = req.params.id;
            const songId = { id: parseInt(idStr) };
            const idValidationresult = joi.validate(songId, songIdSchema);
            if (idValidationresult.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            }{
            //update song in database
            await db.query('UPDATE songs set ? WHERE id = ?',[req.body , idStr]);
            res.json({message: 'Song Updated!'});
            }
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }


    public async deleteSongs(req: Request, res: Response){
        try {
            //Read and Validate ID from URL
            const idStr = req.params.id;
            const songId = { id: parseInt(idStr) };
            const idValidationresult = joi.validate(songId, songIdSchema);
            if (idValidationresult.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            }{
            //Delete song from Database
            await db.query('DELETE FROM songs WHERE id = ?',[idStr]);
            res.json({message:'song deleted'});
            }
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }


}

const songsController = new SongsController();
export default songsController
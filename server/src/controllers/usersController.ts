import {Request, Response, request} from 'express';
import db from '../database'
import * as joi from "joi";

export const UserIdSchema = {
    id: joi.number()
};

export const userDetailsSchema = {
    userName: joi.string(),
    //password: joi.string()
};
class UsersController{

    public async getAllUsers (req: Request, res: Response){
        try {
            const users = await db.query('SELECT * FROM Users');
            res.json(users);
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal Server Error"}).send();
        }
    }

    public async getUserById (req: Request, res: Response){
        try {
            //Read and Validate 
            const idS = req.params.id;
            const userId = { id: parseInt(idS) };
            const validation = joi.validate(userId, UserIdSchema);
            if (validation.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            }{
                //get user by ID
                const users = await db.query('SELECT * FROM  users WHERE id = ?',[idS]);
                if (users.length > 0){
                return res.json(users[0]);
                }
                res.status(404).json({error: "Not found"})
                }
            } catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error"}).send();
            }
        
    }

    public async createUsers(req: Request, res: Response){
        try {
            // Read and validate the user from the request body
            const newUser = req.body;
            const result = joi.validate(newUser, userDetailsSchema);
            if (result.error) {
                res.json({ msg: 'Bad Request'}).status(400).send();
            } else {
                // Save the user into the database
                await db.query('INSERT INTO users set ?',[req.body]);
                res.json({message:'user saved'});
            }
        } catch(err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }

    public async updateUsers(req: Request, res:Response){
        try {
            //Read and Validate 
            const idStr = req.params.id;
            const userId = { id: parseInt(idStr) };
            const idValidationresult = joi.validate(userId, UserIdSchema);
            if (idValidationresult.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            }{
            //update user in database
            await db.query('UPDATE users set ? WHERE id = ?',[req.body , idStr]);
            res.json({message: 'User Updated!'});
            }
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }


    public async deleteUsers(req: Request, res: Response){
        try {
            //Read and Validate 
            const idStr = req.params.id;
            const userId = { id: parseInt(idStr) };
            const validationResult = joi.validate(userId, UserIdSchema);
            if (validationResult.error) {
                res.status(400).json({ error: "Bad Request" }).send();
            }{
            //Delete user 
            await db.query('DELETE FROM users WHERE id = ?',[idStr]);
            res.json({message:'user deleted'});
            }
        } catch (err) {
            // Handle unexpected errors
            console.error(err);
            res.status(500).json({ error: "Internal server error"}).send();
        }
    }

}

const usersController = new UsersController();
export default usersController;
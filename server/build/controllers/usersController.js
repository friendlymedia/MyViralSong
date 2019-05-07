"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const joi = __importStar(require("joi"));
exports.UserIdSchema = {
    id: joi.number()
};
exports.userDetailsSchema = {
    userName: joi.string(),
};
class UsersController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield database_1.default.query('SELECT * FROM Users');
                res.json(users);
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" }).send();
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate 
                const idS = req.params.id;
                const userId = { id: parseInt(idS) };
                const validation = joi.validate(userId, exports.UserIdSchema);
                if (validation.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                {
                    //get user by ID
                    const users = yield database_1.default.query('SELECT * FROM  users WHERE id = ?', [idS]);
                    if (users.length > 0) {
                        return res.json(users[0]);
                    }
                    res.status(404).json({ error: "Not found" });
                }
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    createUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Read and validate the user from the request body
                const newUser = req.body;
                const result = joi.validate(newUser, exports.userDetailsSchema);
                if (result.error) {
                    res.json({ msg: 'Bad Request' }).status(400).send();
                }
                else {
                    // Save the user into the database
                    yield database_1.default.query('INSERT INTO users set ?', [req.body]);
                    res.json({ message: 'user saved' });
                }
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    updateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate 
                const idStr = req.params.id;
                const userId = { id: parseInt(idStr) };
                const idValidationresult = joi.validate(userId, exports.UserIdSchema);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                {
                    //update user in database
                    yield database_1.default.query('UPDATE users set ? WHERE id = ?', [req.body, idStr]);
                    res.json({ message: 'User Updated!' });
                }
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate 
                const idStr = req.params.id;
                const userId = { id: parseInt(idStr) };
                const validationResult = joi.validate(userId, exports.UserIdSchema);
                if (validationResult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                {
                    //Delete user 
                    yield database_1.default.query('DELETE FROM users WHERE id = ?', [idStr]);
                    res.json({ message: 'user deleted' });
                }
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;

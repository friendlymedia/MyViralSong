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
exports.votesIdSchema = {
    users_id: joi.number(),
    eventscode: joi.string(),
    songs_id: joi.number()
};
exports.eventIdSchema = {
    eventscode: joi.string(),
    songs_id: joi.string(),
};
class VotesController {
    getAllVotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get all songs
                const votes = yield database_1.default.query('SELECT * from votes ');
                res.json(votes);
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    getVotesByEventcode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate event_ID in URL
                const idStr = req.params;
                const idValidationresult = joi.validate(idStr, exports.eventIdSchema);
                console.log("idValidationresult: ");
                console.dir(idValidationresult);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad request" }).send();
                }
                {
                    //get votes by events
                    const votes = yield database_1.default.query('SELECT songs_id, eventscode, count(*) AS uservotes FROM votes WHERE eventscode = ? and songs_id = ?', [idStr.eventscode, idStr.songs_id]);
                    console.log("votes: ");
                    if (votes.length > 0) {
                        return res.json(votes[0]);
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
    deleteVotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate ID from URL
                const idStr = req.params.songs_id;
                const voteId = { songs_id: parseInt(idStr) };
                const idValidationresult = joi.validate(voteId, exports.votesIdSchema);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                {
                    //Delete song from Database
                    yield database_1.default.query('DELETE FROM votes WHERE songs_id = ?', [idStr]);
                    res.json({ message: 'vote deleted' });
                }
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    voteSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //validate user
                /*if ((req as AuthenticatedRequest).users_id === undefined) {
                   throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
                }*/
                // Validate the request body
                const newVote = req.body;
                const idValidationresult = joi.validate(newVote, exports.votesIdSchema);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                else {
                    // Try to find previous vote by same user
                    const votes = yield database_1.default.query('SELECT * FROM  votes WHERE  users_id = ? and eventscode = ? and songs_id = ? LIMIT 1', [newVote.users_id, newVote.eventscode, newVote.songs_id]);
                    //res.status(200).json({message:'success = false'});
                    if (votes.length === 1) {
                        //if find the vote by same user and the same song, we cannot vote again
                        res.status(403).json({ error: "You have already voted" });
                    }
                    else if (votes === undefined || votes.length === 0) {
                        //save vote to Database
                        yield database_1.default.query('INSERT INTO votes set ?', [newVote]);
                        res.json({ message: 'vote saved' });
                    }
                    else {
                        res.status(400).json({ error: "bad request" });
                    }
                }
            }
            catch (err) {
                // Handle Unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
}
const votesController = new VotesController();
exports.default = votesController;

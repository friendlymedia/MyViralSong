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
exports.songIdSchema = {
    id: joi.number()
};
exports.songSchema = {
    title: joi.string(),
    artist: joi.string(),
    genre: joi.string(),
    url: joi.string(),
    eventscode: joi.string(),
};
class SongsController {
    getAllSongs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get all songs
                const songs = yield database_1.default.query('SELECT * FROM songs');
                res.json(songs);
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate ID in URL 
                const idStr = req.params.id;
                const songId = { id: parseInt(idStr) };
                const idValidationresult = joi.validate(songId, exports.songIdSchema);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                {
                    //get song by ID
                    const songs = yield database_1.default.query('SELECT * FROM  songs WHERE id = ?', [idStr]);
                    if (songs.length > 0) {
                        return res.json(songs[0]);
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
    createSongs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate the new song from the request body
                const newSong = req.body;
                const validationresult = joi.validate(newSong, exports.songSchema);
                if (validationresult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                else {
                    //create new song to database
                    yield database_1.default.query('INSERT INTO songs set ?', [newSong]);
                    res.json({ message: 'song saved' });
                }
            }
            catch (err) {
                // handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    updateSong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate ID from URL
                const idStr = req.params.id;
                const songId = { id: parseInt(idStr) };
                const idValidationresult = joi.validate(songId, exports.songIdSchema);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                {
                    //update song in database
                    yield database_1.default.query('UPDATE songs set ? WHERE id = ?', [req.body, idStr]);
                    res.json({ message: 'Song Updated!' });
                }
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    deleteSongs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate ID from URL
                const idStr = req.params.id;
                const songId = { id: parseInt(idStr) };
                const idValidationresult = joi.validate(songId, exports.songIdSchema);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                {
                    //Delete song from Database
                    yield database_1.default.query('DELETE FROM songs WHERE id = ?', [idStr]);
                    res.json({ message: 'song deleted' });
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
const songsController = new SongsController();
exports.default = songsController;

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
exports.eventCodeSchema = {
    eventscode: joi.string(),
};
exports.eventSchema = {
    eventscode: joi.string(),
    eventname: joi.string(),
    users_id: joi.number(),
};
class EventController {
    getAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get all events
                const events = yield database_1.default.query('SELECT * FROM events');
                res.json(events);
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" }).send();
            }
        });
    }
    addEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //read and Validate the new event from the request body
                const newEvent = req.body;
                const result = joi.validate(newEvent, exports.eventSchema);
                console.log("result: ");
                console.dir(result);
                if (result.error) {
                    res.json({ msg: 'Bad Request' }).status(400).send();
                }
                else {
                    // Save the user into the database
                    yield database_1.default.query('INSERT INTO events set ?,eventscode = md5(now())', [newEvent]);
                    res.json({ message: 'events saved' });
                    // events set eventscode = md5(now()), eventname = ?
                }
            }
            catch (err) {
                // handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal server error" }).send();
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Read and Validate eventscode in URL
                const idStr = req.params;
                const idValidationresult = joi.validate(idStr, exports.eventCodeSchema);
                console.log("idValidationresult: ");
                console.dir(idValidationresult);
                if (idValidationresult.error) {
                    res.status(400).json({ error: "Bad request" }).send();
                }
                {
                    //get events by eventscode
                    const events = yield database_1.default.query('SELECT * FROM events WHERE eventscode = ?', [idStr.eventscode]);
                    console.log("votes: ");
                    if (events.length > 0) {
                        return res.json(events[0]);
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
}
exports.eventController = new EventController();
exports.default = exports.eventController;

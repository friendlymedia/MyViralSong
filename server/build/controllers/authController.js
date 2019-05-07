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
const usersController_1 = require("./usersController");
const database_1 = __importDefault(require("../database"));
const joi = __importStar(require("joi"));
const eventController_1 = require("./eventController");
class AuthController {
    CreateForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Read and validate the user details from the request body
                const userDetails = req.body;
                const eventDetails = req.body;
                const result = joi.validate(userDetails, usersController_1.userDetailsSchema);
                const result1 = joi.validate(eventDetails, eventController_1.eventSchema);
                if (result1.error) {
                    res.status(400).json({ error: "Bad Request" }).send();
                }
                else {
                    // Try to find the user with the given credentials
                    const users = yield database_1.default.query('INSERT INTO users set ?', [req.body]);
                    const events = yield database_1.default.query('INSERT INTO events set eventscode = md5(now()), eventname = ?', [req.body]);
                    res.json(users);
                    res.json(events);
                }
            }
            catch (err) {
                // Handle unexpected errors
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" }).send();
            }
        });
    }
}
const authController = new AuthController();
exports.default = authController;

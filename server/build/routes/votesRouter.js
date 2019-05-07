"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const votesController_1 = __importDefault(require("../controllers/votesController"));
class VotesRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', votesController_1.default.getAllVotes);
        this.router.delete('/:songs_id', votesController_1.default.deleteVotes);
        this.router.get('/:eventscode/:songs_id', votesController_1.default.getVotesByEventcode);
        this.router.post('/', votesController_1.default.voteSong);
    }
}
const votesRouter = new VotesRouter();
exports.default = votesRouter.router;

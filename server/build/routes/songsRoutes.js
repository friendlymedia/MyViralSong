"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songsController_1 = __importDefault(require("../controllers/songsController"));
class SongsRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', songsController_1.default.getAllSongs);
        this.router.get('/:id', songsController_1.default.getOne);
        this.router.post('/', songsController_1.default.createSongs);
        this.router.put('/:id', songsController_1.default.createSongs);
        this.router.delete('/:id', songsController_1.default.deleteSongs);
    }
}
const songsRouters = new SongsRouter();
exports.default = songsRouters.router;

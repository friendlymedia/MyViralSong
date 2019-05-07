"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
class UsersRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', usersController_1.default.getAllUsers);
        this.router.get('/:id', usersController_1.default.getUserById);
        this.router.post('/', usersController_1.default.createUsers);
        this.router.put('/:id', usersController_1.default.updateUsers);
        this.router.delete('/:id', usersController_1.default.deleteUsers);
    }
}
const usersRouter = new UsersRouter();
exports.default = usersRouter.router;

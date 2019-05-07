"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
class EventRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', eventController_1.eventController.getAllEvents);
        this.router.get('/:eventscode', eventController_1.eventController.getOne);
        this.router.post('/', eventController_1.eventController.addEvent);
    }
}
const eventRouter = new EventRouter();
exports.default = eventRouter.router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class IndexController {
    index(req, res) {
        res.json({ text: 'Welcome' });
    }
    AddCode(req, res) {
        const code = crypto_1.default.createHash('md5').update('PARTY').digest("hex");
        res.json(code);
    }
}
exports.indexController = new IndexController();

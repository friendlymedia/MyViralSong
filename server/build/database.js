"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const dbConnection_1 = __importDefault(require("./dbConnection"));
const db = promise_mysql_1.default.createPool(dbConnection_1.default.database);
//Make connection with our Database
db.getConnection().then(connection => {
    db.releaseConnection(connection);
    console.log('DB Connection');
});
exports.default = db;

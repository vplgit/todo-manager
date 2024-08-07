"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const handlers_1 = require("./common/handlers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
const port = 3000;
app.use(body_parser_1.default.json());
//api route inception
app.use("/api", require("./api"));
//common error handler
app.use(handlers_1.errror_handler);
app.listen(port, () => {
    console.log(`To-Do List Manager app listening at http://localhost:${port}`);
});

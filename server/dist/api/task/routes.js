"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = require("./controller");
router.get("/todo", controller_1.Controller.getList);
router.post("/todo", controller_1.Controller.saveData);
router.put("/todo", controller_1.Controller.markComplete);
router.delete("/todo", controller_1.Controller.deleteData);
router.post("/todo/redo", controller_1.Controller.redoTask);
router.post("/todo/undo", controller_1.Controller.undoTask);
module.exports = router;

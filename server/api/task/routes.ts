import express from "express";
const router = express.Router();

import { Controller } from "./controller";

router.get("/todo", Controller.getList);
router.post("/todo", Controller.saveData);
router.put("/todo", Controller.markComplete);
router.delete("/todo", Controller.deleteData);

router.post("/todo/redo", Controller.redoTask);
router.post("/todo/undo", Controller.undoTask);

module.exports = router;

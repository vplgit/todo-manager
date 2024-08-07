import express from "express";

const router = express.Router();
router.use("/v1", require("./task/routes"));

module.exports = router;

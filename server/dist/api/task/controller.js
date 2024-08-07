"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const service_1 = require("./service");
const service = new service_1.Service();
exports.Controller = {
    getList: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service.getList(req.query);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    saveData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service.saveData(req.body);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    markComplete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service.markComplete(req.body);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    deleteData: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service.deleteData(req.body);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    undoTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service.undoTask(req.body);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
    redoTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield service.redoTask(req.body);
            res.status(result.statusCode).send(result);
        }
        catch (error) {
            next(error);
        }
    }),
};

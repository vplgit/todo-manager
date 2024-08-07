import { Request, Response, NextFunction } from "express";
import { Service } from "./service";
const service = new Service();
export const Controller = {
  getList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = await service.getList(req.query);
      res.status(result.statusCode).send(result);
    } catch (error: any) {
      next(error);
    }
  },

  saveData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = await service.saveData(req.body);
      res.status(result.statusCode).send(result);
    } catch (error: any) {
      next(error);
    }
  },

  markComplete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = await service.markComplete(req.body);
      res.status(result.statusCode).send(result);
    } catch (error: any) {
      next(error);
    }
  },

  deleteData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = await service.deleteData(req.body);
      res.status(result.statusCode).send(result);
    } catch (error: any) {
      next(error);
    }
  },

  undoTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = await service.undoTask(req.body);
      res.status(result.statusCode).send(result);
    } catch (error: any) {
      next(error);
    }
  },

  redoTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = await service.redoTask(req.body);
      res.status(result.statusCode).send(result);
    } catch (error: any) {
      next(error);
    }
  },
};

import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../service/error-handler.service";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof BadRequestException) {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: "Something Went Wrong!." });
}
import { Router, Request, Response } from "express";
import { errorHandler } from "../middleware/error-handler.middleware";
import { appService } from "../service/app.service";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const response = await appService.test();
    return res.status(response.status).json(response.data);
});
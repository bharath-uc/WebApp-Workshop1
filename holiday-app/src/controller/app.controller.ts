import { Router, Request, Response } from "express";
import { appService } from "../service/app.service";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const response = await appService.test();
    return res.status(response.status).json(response.data);
});

router.get("/country-list", async (req: Request, res: Response) => {
    const response = await appService.getCountryList();
    return res.status(response.status).json(response.data);
});

router.post("/country-holiday", async (req: Request, res: Response) => {
    console.log(req.body);
    const response = await appService.saveCountryHolidays(req.body.countryCode, req.body.year);
    return res.status(response.status).json(response.data);
});
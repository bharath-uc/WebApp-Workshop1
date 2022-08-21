import express from "express";
import bodyParser from "body-parser";
import { router } from "../controller/app.controller";
import "./db.config";

class APP {
    private app: express.Application = express();

    constructor() {}

    public start() {
        this.appConfig();
        this.parserConfig();
        this.routerConfig();
    }

    private appConfig() {
        this.app.listen(3000, () => {
            console.log("Express Server is Running.");
        })
    }

    private parserConfig() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private routerConfig() {
        this.app.use(router);
    }
}

export const app = new APP();
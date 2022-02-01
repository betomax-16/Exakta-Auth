import express, { Request, Response, Router } from 'express';
import { HTML_FILE } from "../server";
import path from "path";

class Routes {
    public router: Router;

    constructor() {
        this.router = express.Router();

        this.router.get('/', (req: Request, res: Response) => {
            res.sendFile(path.join(HTML_FILE, 'index.html'));
        });

        this.router.get('/_status', (req: Request, res: Response) => {
            res.status(200).send('Healthy!!!');
        });
    }
}

export default new Routes().router;
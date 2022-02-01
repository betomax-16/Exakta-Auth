import express, { Router } from 'express';
import authRoute from './api/auth';
import sucursalRoute from "./api/sucursal";
import areaRoute from "./api/area";
import sucursal_areaRoute from "./api/sucursal-area";
import userRoute from "./api/user";

class Routes {
    public router: Router;

    constructor() {
        this.router = express.Router();

        this.router.use(authRoute);
        this.router.use(userRoute);
        this.router.use(sucursalRoute);
        this.router.use(areaRoute);
        this.router.use(sucursal_areaRoute);
    }
}

export default new Routes().router;
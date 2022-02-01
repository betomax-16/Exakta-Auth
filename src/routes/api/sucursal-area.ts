import { Request, Response, Router } from "express";
import sucursalAreaController from "../../controllers/sucursalAreaController";
import { ISucursalArea } from "../../models/sucursal-area";
import { Errors } from "../../utils/errors";
import { ResponseWrapper } from "../../utils/responseWrapper";


class SucursalAreaRoute {
    public router: Router;

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.route('/sucursal-area')
                                .get(this.getAll)
                                .post(this.create);
        this.router.route('/sucursal-area/:suc')
                                .get(this.get);
        this.router.route('/sucursal-area/:suc/:area')
                                .delete(this.delete);
    }

    async getAll(req: Request, res: Response) {
        try {
            const result: ISucursalArea[]|null = await sucursalAreaController.getAll();
            ResponseWrapper.handler(res, result, 200);
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const result: ISucursalArea[]|null = await sucursalAreaController.get(req.params.suc);
            ResponseWrapper.handler(res, result, 200);
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const result: ISucursalArea|null = await sucursalAreaController.create(req.body);
            ResponseWrapper.handler(res, result, 201);
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result: ISucursalArea|null = await sucursalAreaController.delete(req.params.suc, req.params.area);
            if (result) {
                ResponseWrapper.handler(res, { message: 'Successful removal.' }, 200);
            }
            else {
                ResponseWrapper.handler(res, { message: 'Non-existent sucursal.' }, 404);
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }
}
export default new SucursalAreaRoute().router;
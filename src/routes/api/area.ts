import { Request, Response, Router } from "express";
import areaController from "../../controllers/areaController";
import { IArea } from "../../models/area";
import { Errors } from "../../utils/errors";
import { ResponseWrapper } from "../../utils/responseWrapper";


class AreaRoute {
    public router: Router;

    constructor() {
        this.getAll = this.getAll.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.route('/area')
                                .get(this.getAll)
                                .post(this.create);
        this.router.route('/area/:name')
                                .get(this.get)
                                .put(this.update)
                                .delete(this.delete);
    }

    async getAll(req: Request, res: Response) {
        try {
            const result: IArea[]|null = await areaController.getAll();
            ResponseWrapper.handler(res, result, 200);
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async get(req: Request, res: Response) {
        try {
            const result: IArea|null = await areaController.get(req.params.name);
            if (result) {
                ResponseWrapper.handler(res, result, 200);
            }
            else {
                ResponseWrapper.handler(res, {}, 404);
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const result: IArea|null = await areaController.create(req.body);
            ResponseWrapper.handler(res, result, 201);
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const result: any|null = await areaController.update(req.params.name, req.body);
            if (result.modifiedCount == 1) {
                let suc: IArea|null = null;
                if (req.body.name) {
                    suc = await areaController.get(req.body.name);
                }
                else {
                    suc = await areaController.get(req.params.name);
                }

                ResponseWrapper.handler(res, suc, 201);
            }
            else {
                ResponseWrapper.handler(res, { message: 'No modification.' }, 500);
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result: IArea|null = await areaController.delete(req.params.name);
            if (result) {
                ResponseWrapper.handler(res, { message: 'Successful removal.' }, 200);
            }
            else {
                ResponseWrapper.handler(res, { message: 'Non-existent area.' }, 404);
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }
}
export default new AreaRoute().router;
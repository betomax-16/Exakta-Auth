import { Request, Response, Router } from "express";
import userController from "../../controllers/userController";
import { Errors } from "../../utils/errors";
import { ResponseWrapper } from "../../utils/responseWrapper";

class UserRoute {
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
        this.router.route('/user')
                                .get(this.getAll)
                                .post(this.create);
        this.router.route('/user/:username')
                                .get(this.get)
                                .put(this.update)
                                .delete(this.delete);
    }

    async getAll(req: Request, res: Response) {
        try {
            const result = await userController.getAll();
            ResponseWrapper.handler(res, result, 200);
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };

    async get(req: Request, res: Response) {
        try {
            const newUser = await userController.get(req.params.username);
            if (newUser) {
                ResponseWrapper.handler(res, newUser, 200);  
            }
            else {
                ResponseWrapper.handler(res, newUser, 401);  
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };

    async create(req: Request, res: Response) {
        try {
            const result = await userController.create(req.body);
            ResponseWrapper.handler(res, result, 201);
        } catch (error: any) {
            Errors.handler(error, res);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const newUser = await userController.update(req.params.username, req.body);
            if (newUser.modifiedCount == 1) {
                ResponseWrapper.handler(res, { message: 'Actualización exitosa.' }, 200);
            }
            else {
                ResponseWrapper.handler(res, { message: 'Sin modificar.' }, 500);
            }
            
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };

    async delete(req: Request, res: Response) {
        try {
            const result = await userController.delete(req.params.username);
            if (result) {
                ResponseWrapper.handler(res, { message: 'Eliminación exitosa.' }, 200);
            }
            else {
                ResponseWrapper.handler(res, { message: 'Usuario inexistente.' }, 404);
            }
            
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };
}
export default new UserRoute().router;
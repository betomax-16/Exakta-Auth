import { Request, Response, Router } from "express";
import credentialController from "../../controllers/credentialController";
import userController from "../../controllers/userController";
import * as bcrypt from "bcryptjs";
import { Errors } from "../../utils/errors";
import dotenv from "dotenv";
import { ICredential } from "../../models/credential";
import { ResponseWrapper } from "../../utils/responseWrapper";

dotenv.config();

class AuthRoute {
    public router: Router;

    constructor() {
        this.logup = this.logup.bind(this);
        this.login = this.login.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.delete = this.delete.bind(this);
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.route('/login').post(this.login);
        this.router.route('/logup').post(this.logup);
        this.router.route('/credentials/:username')
                                .put(this.updatePassword)
                                .delete(this.delete);
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const result: ICredential|null = await credentialController.get(username);

            if (result && result.password) {
                if (bcrypt.compareSync(password, result.password)) {
                    const user = await userController.get(result.username);
                    ResponseWrapper.handler(res, user, 200); 
                }
                else {
                    ResponseWrapper.handler(res, { message: 'Credenciales invalidas.' }, 401); 
                }
            }
            else {
                ResponseWrapper.handler(res, { message: 'Credenciales invalidas.' }, 401);
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };

    async logup(req: Request, res: Response) {
        try {
            const newCredential = await credentialController.create(req.body);
            if (newCredential) {
                const result = await userController.create(req.body);
                ResponseWrapper.handler(res, result, 201); 
            }
            else {
                ResponseWrapper.handler(res, { message: 'Error al crear las credenciales.' }, 500);
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };

    async updatePassword(req: Request, res: Response) {
        try {
            const newCredential = await credentialController.update(req.params.username, req.body);
            if (newCredential.modifiedCount == 1) {
                ResponseWrapper.handler(res, { message: 'Actualización exitosa.' }, 201);
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
            const credential = await credentialController.delete(req.params.username);
            if (credential) {
                const result = await userController.delete(req.params.username);
                ResponseWrapper.handler(res, { message: 'Eliminación exitosa.' }, 200);
            }
            else {
                ResponseWrapper.handler(res, { message: 'Credencial inexistente.' }, 404);
            }
            
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };
}
export default new AuthRoute().router;
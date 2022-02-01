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
                    ResponseWrapper.handler(res, { message: 'Invalid credentials.' }, 401); 
                }
            }
            else {
                ResponseWrapper.handler(res, { message: 'Invalid credentials.' }, 401);
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
                ResponseWrapper.handler(res, { message: 'Error to create credentials.' }, 500);
            }
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };

    async updatePassword(req: Request, res: Response) {
        try {
            const newCredential = await credentialController.update(req.params.username, req.body);
            if (newCredential.modifiedCount == 1) {
                ResponseWrapper.handler(res, { message: 'Successful modification.' }, 201);
            }
            else {
                ResponseWrapper.handler(res, { message: 'No modification.' }, 500);
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
                ResponseWrapper.handler(res, { message: 'Successful removal.' }, 200);
            }
            else {
                ResponseWrapper.handler(res, { message: 'Non-existent credential.' }, 404);
            }
            
        } catch (error: any) {
            Errors.handler(error, res);
        }
    };
}
export default new AuthRoute().router;
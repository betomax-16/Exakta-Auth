import Credential, { ICredential } from "../models/credential";
import dotenv from "dotenv";

dotenv.config();

class AuthController {

    static async get(username: string): Promise<ICredential|null>{
        try {
            return await Credential.findOne({username: username});
        } catch (error: any) {
            throw error;
        }
    };

    static async create(data: ICredential): Promise<ICredential|null> {
        try {
            const newCredential: ICredential = new Credential(data);
            return await newCredential.save();
        } catch (error: any) {
            throw error;
        }
    };


    static async update(username: string, data: ICredential): Promise<any|null> {
        if (data._id) {
            delete data._id;
        }

        try {
            return await Credential.updateOne({username: username}, { $set: {password: data.password} });
        } catch (error: any) {
            throw error;
        }
    };

    static async delete(username: string): Promise<ICredential|null> {
        try {
            return await Credential.findOneAndDelete({username: username});
        } catch (error: any) {
            throw error;
        }
    }
}
export default AuthController;
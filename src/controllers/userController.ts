import User, { IUser } from "../models/user";
import dotenv from "dotenv";

dotenv.config();

class UserController {

    static async getAll(): Promise<IUser[]|null>{
        try {
            return await User.find({});
        } catch (error: any) {
            throw error;
        }
    };

    static async get(username: string): Promise<IUser|null>{
        try {
            return await User.findOne({username: username});
        } catch (error: any) {
            throw error;
        }
    };

    static async create(data: IUser): Promise<IUser|null> {
        try {
            const newData: IUser = new User(data);
            return await newData.save();
        } catch (error: any) {
            throw error;
        }
    };


    static async update(username: string, data: IUser): Promise<any|null> {
        if (data._id) {
            delete data._id;
        }

        try {
            return await User.updateOne({username: username}, { $set: data });
        } catch (error: any) {
            throw error;
        }
    };

    static async delete(username: string): Promise<IUser|null> {
        try {
            return await User.findOneAndDelete({username: username});
        } catch (error: any) {
            throw error;
        }
    }
}
export default UserController;
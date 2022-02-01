import Area, { IArea } from "../models/area";

class AreaController {

    static async getAll(): Promise<IArea[]|null>{
        try {
            return await Area.find({});
        } catch (error: any) {
            throw error;
        }
    };

    static async get(name: string): Promise<IArea|null>{
        try {
            return await Area.findOne({name: name});
        } catch (error: any) {
            throw error;
        }
    };

    static async create(data: IArea): Promise<IArea|null> {
        try {
            const newData: IArea = new Area(data);
            return await newData.save();
        } catch (error: any) {
            throw error;
        }
    };


    static async update(name: string, data: IArea): Promise<any|null> {
        if (data._id) {
            delete data._id;
        }

        try {
            return await Area.updateOne({name: name}, { $set: data });
        } catch (error: any) {
            throw error;
        }
    };

    static async delete(name: string): Promise<IArea|null> {
        try {
            return await Area.findOneAndDelete({name: name});
        } catch (error: any) {
            throw error;
        }
    }
}
export default AreaController;
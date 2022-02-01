import SucursalArea, { ISucursalArea } from "../models/sucursal-area";

class SucursalAreaController {

    static async getAll(): Promise<ISucursalArea[]|null>{
        try {
            return await SucursalArea.find({});
        } catch (error: any) {
            throw error;
        }
    };

    static async get(sucursal: string): Promise<ISucursalArea[]|null>{
        try {
            return await SucursalArea.find({sucursal: sucursal});
        } catch (error: any) {
            throw error;
        }
    };

    static async create(data: ISucursalArea|any): Promise<ISucursalArea|null> {
        try {
            const newData: ISucursalArea = new SucursalArea(data);
            return await newData.save();
        } catch (error: any) {
            throw error;
        }
    };

    static async update(query: any, data: ISucursalArea|any): Promise<any|null> {
        if (data._id) {
            delete data._id;
        }

        try {
            return await SucursalArea.updateMany(query, { $set: data });
        } catch (error: any) {
            throw error;
        }
    };
    
    static async delete(sucursal: string, area: string): Promise<ISucursalArea|null> {
        try {
            return await SucursalArea.findOneAndDelete({sucursal: sucursal, area: area});
        } catch (error: any) {
            throw error;
        }
    }
}
export default SucursalAreaController;
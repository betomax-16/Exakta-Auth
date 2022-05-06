import Sucursal, { ISucursal } from "../models/sucursal";
import { RequestExternalAPI } from "../utils/RequestExternalAPI";
import querystring  from "querystring";

class SucursalController {

    static async getAll(): Promise<ISucursal[]|null>{
        try {
            return await Sucursal.find({});
        } catch (error: any) {
            throw error;
        }
    };

    static async get(name: string): Promise<ISucursal|null>{
        try {
            return await Sucursal.findOne({name: name});
        } catch (error: any) {
            throw error;
        }
    };

    static async create(data: ISucursal|any): Promise<ISucursal|null> {
        try {
            const newData: ISucursal = new Sucursal(data);
            const res = await newData.save();
            const auxData = {
                name: res.name,
                color: '#fff',
                timeLimit: 15
            };

            RequestExternalAPI.request('POST', '/api/sucursal', auxData, {'me': ''});
            return res;
        } catch (error: any) {
            throw error;
        }
    };


    static async update(name: string, data: ISucursal): Promise<any|null> {
        if (data._id) {
            delete data._id;
        }

        try {
            const res = await Sucursal.updateOne({name: name}, { $set: data });

            if (res.modifiedCount) {
                const auxData = {
                    name: name
                };
    
                const suc = querystring.escape(name);
                RequestExternalAPI.request('PUT', `/api/sucursal/${suc}`, auxData, {'me': ''});
            }

            return res;
        } catch (error: any) {
            throw error;
        }
    };

    static async delete(name: string): Promise<ISucursal|null> {
        try {
            const res = await Sucursal.findOneAndDelete({name: name});

            const suc = querystring.escape(name);
            RequestExternalAPI.request('DELETE', `/api/sucursal/${suc}`, undefined, {'me': ''});
            return res;
        } catch (error: any) {
            throw error;
        }
    }
}
export default SucursalController;
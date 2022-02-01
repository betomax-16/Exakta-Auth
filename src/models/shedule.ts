import { model, Schema, Document } from 'mongoose';
import { IArea } from "./area";
import { ISucursal } from "./sucursal";

export interface IShedule extends Document {
    sucursal: ISucursal['name'];
    area: IArea['name']; 
    day: string;
    checkInTime: string;
    checkOutTime: string;
}

const SheduleSchema: Schema = new Schema({
    sucursal: { type: String, required: true },
    area: { type: String, required: true },
    day: { type: String, required: true },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true }
},
{ timestamps: true });



export default model<IShedule>('Shedule', SheduleSchema);
import { model, Schema, Document } from 'mongoose';
import sucursalAreaController from "../controllers/sucursalAreaController";

export interface ISucursal extends Document {
  name: string;
  address: string;
  phoneNums: [string];
  reference: string;
}

const SucursalSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  phoneNums: { type: [String], required: true },
  reference: { type: String, required: true },
},
{ timestamps: true })
.pre("updateOne", async function(next) {
    if (this._update.$set.name && this._update.$set.name != '') {
      const query: any = {sucursal: this._conditions.name};
      const data: any = {sucursal: this._update.$set.name};
      await sucursalAreaController.update(query, data);
    }
    next();
});



export default model<ISucursal>('Sucursal', SucursalSchema, 'Sucursales');
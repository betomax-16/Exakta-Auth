import { model, Schema, Document } from 'mongoose';
import { IArea } from "./area";
import { ISucursal } from "./sucursal";
import sucursalController from "../controllers/sucursalController";
import areaController from "../controllers/areaController";

export interface ISucursalArea extends Document {
    sucursal: ISucursal['name'];
    area: IArea['name']; 
}

const SucursalAreaSchema: Schema = new Schema({
    sucursal: { type: String, required: true, index: true },
    area: { type: String, required: true, index: true },
},
{ timestamps: true })
.index({ area: 1, sucursal: 1 }, { unique: true })
.pre("save", async function(this: ISucursalArea, next) {
    const resSuc = await sucursalController.get(this.sucursal);
    if (!resSuc) {
        next(new Error(`Non-existent Sucursal "${this.sucursal}"".`));
    }
    
    const resArea = await areaController.get(this.area);
    if (!resArea) {
        next(new Error(`Non-existent Area "${this.area}"".`));
    }

    next();
})
.pre("updateOne", async function(next) {
    if (this._update.$set.sucursal) {
        const resSuc = await sucursalController.get(this._update.$set.sucursal);
        if (!resSuc) {
            next(new Error(`Non-existent Sucursal "${this._update.$set.sucursal}"".`));
        }
    }
    
    if (this._update.$set.area) {
        const resArea = await areaController.get(this._update.$set.area);
        if (!resArea) {
            next(new Error(`Non-existent Area "${this._update.$set.area}"".`));
        }
    }
    
    next();
});



export default model<ISucursalArea>('SucursalArea', SucursalAreaSchema);
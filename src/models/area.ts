import { model, Schema, Document } from 'mongoose';
import sucursalAreaController from "../controllers/sucursalAreaController";

export interface IArea extends Document {
  name: string;
}

const AreaSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true }
},
{ timestamps: true })
.pre("updateOne", async function(next) {
  if (this._update.$set.name && this._update.$set.name != '') {
    const query: any = {area: this._conditions.name};
    const data: any = {area: this._update.$set.name};
    await sucursalAreaController.update(query, data);
  }
  next();
});



export default model<IArea>('Area', AreaSchema);
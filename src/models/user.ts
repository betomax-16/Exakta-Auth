import { model, Schema, Document } from 'mongoose';
import { ICredential } from "./credential";
import { ISucursal } from "./sucursal";
import CredentialController from "../controllers/credentialController";
import SucursalController from "../controllers/sucursalController";

//id Brand
export interface IUser extends Document {
  username: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  superRol: string;
  sucursal: string;
  urlImage: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  firstLastName: { type: String, required: true },
  secondLastName: { type: String },
  superRol: { type: String, required: true, default: 'pendiente' },
  sucursal: { type: String, required: true },
  urlImage: { type: String },
},
{ timestamps: true })
.pre("save", async function(this: IUser, next) {
  if (this.username) {
    const res: ICredential|null = await CredentialController.get(this.username);
    if (!res) {
        next(new Error(`Usuario inexistente: "${this.username}".`));
    }
  }

  if (this.sucursal) {
    const res: ISucursal|null = await SucursalController.get(this.sucursal);
    if (!res) {
        next(new Error(`Sucursal inexistente: "${this.sucursal}".`));
    }
  }
  next();
});



export default model<IUser>('Users', UserSchema);
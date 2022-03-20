import { model, Schema, Model, Document } from 'mongoose';
import * as bcrypt from "bcryptjs";

//id Brand
export interface ICredential extends Document {
  username: string;
  password?: string;
}

const CredentialSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
},
{ timestamps: true })
.pre("save", function(this: ICredential, next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
})
.pre("updateOne", function(next) {
  // console.log(this.getQuery());
  // console.log(this._update);
  if (this._update.$set.password && this._update.$set.password != '') {
    this._update.$set.password = bcrypt.hashSync(this._update.$set.password, 8);
  }
  next();
});



export default model<ICredential>('Credentials', CredentialSchema);
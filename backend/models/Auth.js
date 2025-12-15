import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, min: 8, max: 60, required: true },
  phone: { type: String, required: true, unique: true },
  image: { type: String },
  role: { type: String },
});
const Auth = model("auth", AuthSchema, "auth");
export default Auth;

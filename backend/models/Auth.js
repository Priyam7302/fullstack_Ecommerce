// import { Schema, model } from "mongoose";

// const AuthSchema = new Schema(
//   {
//     name: { type: String },
//     email: { type: String, required: true, unique: true },
//     username: { type: String,  unique: true },
//     password: { type: String, min: 8, max: 60 },
//     phone: { type: String, unique: true },
//     image: { type: String },
//     role: { type: String },
//     googleId: { type: String, unique: true, sparse: true },
//     authProvider: { type: String, enum: ["local", "google"], default: "local" },
//   },
//   {timestamps: true}
// );
// const Auth = model("auth", AuthSchema, "auth");
// export default Auth;

import { Schema, model } from "mongoose";

const AuthSchema = new Schema(
  {
    name: { type: String },

    email: { type: String, required: true, unique: true },

    username: { type: String, unique: true, sparse: true },

    password: { type: String, min: 8, max: 60 },

    phone: { type: String, unique: true, sparse: true },

    image: { type: String },

    role: { type: String, default: "user" },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: { type: String, unique: true, sparse: true },

    // 🔒 NEW
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Auth = model("auth", AuthSchema, "auth");
export default Auth;
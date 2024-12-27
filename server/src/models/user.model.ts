import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: "admin" | "user" | "tutor";
  roleId?: mongoose.Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "tutor"],
      default: "user",
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model<IUser>("User", userSchema);

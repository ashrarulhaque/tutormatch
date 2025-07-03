import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Prefer not to say'],
      required: true,
    },
    role: {
      type: String,
      enum: ['Student', 'Teacher'],
      required: true,
    },
    avatar: {
      type: String,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'roleModel',
    },
    roleModel: {
      type: String,
      required: true,
      enum: ['Student', 'Teacher'], // Should match actual model names
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;

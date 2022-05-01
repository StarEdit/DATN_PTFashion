import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import mongooseDelete from "mongoose-delete";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    isWork: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
    resetPasswordToken: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  console.log(this, "Saving the document");

  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deleteAt: true,
});

const User = mongoose.model("User", userSchema);
export default User;

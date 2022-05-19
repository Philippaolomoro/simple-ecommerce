import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter a user name"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      required: [true, "Please select a role"],
    },
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcryptjs.genSalt(8);
    const passwordHash = await bcryptjs.hashSync(this.password, salt);
    if (this.isModified("password") || this.isNew) {
      this.password = passwordHash;
      next();
    }
  } catch (err) {
    next(err);
  }
});

// UserSchema.methods.comparePassword = async function (password, callback) {
//   await bcryptjs.compare(password, this.password, (err, isMatch) => {
//     if (err) {
//       return callback(err);
//     } else {
//       callback(null, isMatch);
//     }
//   });
// };

UserSchema.methods.comparePassword = async function comparePassword(data){
  return bcryptjs.compare(data, this.password)
}

const userModel = mongoose.model("User", UserSchema);

export default userModel;

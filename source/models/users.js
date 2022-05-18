import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: [buyer, seller],
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hashSync(this.password, salt);
    if (this.isModified("password")) {
      this.password = passwordHash;
      next();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);

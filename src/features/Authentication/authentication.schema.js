import mongoose from "mongoose";

const AuthSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name should contain atleast three characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already registered"],
    validate: {
      validator: function (emailValue) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
      },
      message: "Enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "MALE", "FEMALE"],
    },
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

export const AuthModel = mongoose.model("User", AuthSchema);

const mongoose = require("mongoose");
const mealSchema = mongoose.Schema(
  {
    userId: {
      // its id from user tabel / delet or update
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      trim: true,
      //   if type is txt then txt is required
      required: () => this.mealType == "txt",
    },
    image: {
      type: String,
      //   required: true,
      //   required: () => this.mealType == "img",
    },
    images: [{
      type: String
  }],


    categories: {
      type: Array,
    },


    price: {
      type: Number,
      // required: true
    },
    mealType: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      enum: ["txt", "file", "img"],
    },
    
    file: {
      type: String,
      trim: true,
      required: () => this.mealType == "file",
    },
  },
  { timestamps: true }
);

mealSchema.pre("save", async function () {
  if (this.mealType == "txt" && this.file)
    throw new Error("file must be remove");
  //   else if (this.mealType == "img" && this.file)
  //     throw new Error("file must be remove");
  else if (this.mealType != "txt" && this.content)
    throw new Error("content must be remove");
});

const mealModel = mongoose.model("Meal", mealSchema);
module.exports = mealModel;

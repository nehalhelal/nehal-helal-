   
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      // its id from user tabel / delet or update
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    meal: [
      {
        mealId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Meal",
      },


        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);

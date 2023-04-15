   
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);

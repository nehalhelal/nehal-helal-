const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// use schema remove table name
const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minlengthe: 3,
      maxlength: 10,
    },
    lname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minlengthe: 3,
      maxlength: 10,
    },
    age: {
      type: Number,
      min: 12,
      max: 80,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,

      validator(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email ");
      },
    },

    

    // schema to incoded pass
    password: {
      type: String,
      trim: true,
      required: true,
    },

    gender: {
      type: String,
      lowercase: true,
      enum: ["male", "female"],
    },
    phone: {
      type: String,
      trim: true,

      validator(value) {
        if (!validator.isMobilePhone(value, "ar-EG"))
          throw new Error("invalid phone number");
      },
    },
    adresses: [
      {
        addName: { type: String, trim: true, required: true, lowercase: true },
        addDetails: {
          type: String,
          trim: true,
          required: true,
          lowercase: true,
        },
      },
    ],
    days: [
      {
        dayName: {
          type: String,
          trim: true,
          lowercase: true,
          enum: [
            "Saturday",
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
        },
        addDetails: {
          type: String,
          trim: true,
          lowercase: true,
        },
      },
    ],
    // ***************
    //   to check its admin
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },

    image:{
      type:String
  }, 
    // ******************
    //tokens several times
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },

  {
    // tell me time and date of last update
    // created at andupdated at
    timestamps: true,
  }
);

// *****************toJson view data in postman ** to make output clear

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.tokens;
  return data;
};

// ***********************
//virtual  to creat relations  tabels
userSchema.virtual("myMeal", {
  ref: "Meal",
  localField: "_id",
  foreignField: "userId",
});

// *********************
// pre save before schema  is run /// bcrypt to incode password // salt : times of itteration
userSchema.pre("save", async function () {
  if (this.isModified("password"))
    // salt rounds is عدد المرات التى تتم داخل عملية التشفير
    this.password = await bcrypt.hash(this.password, 15);
  // console.log("pre save")
  // console.log(this)this  its all object that we entered
});
// **************when i make remove one user then its remove all meals blongs to him
userSchema.pre("findByIdAndDelete", async function () {
  await mealModel.remove({ userId: this._id });
});
// ********************
userSchema.statics.login = async (email, password) => {
  const userData = await userModel.findOne({ email: email });
  if (!userData) throw new Error("invalid email");
  const matched = await bcrypt.compare(password, userData.password);
  if (!matched) throw new Error("invalid password");
  return userData;
};

// *********************************
// generateToken is method / object
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTKEY);
  // this.tokens.push({token}) ==
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

//  outcome is only model
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

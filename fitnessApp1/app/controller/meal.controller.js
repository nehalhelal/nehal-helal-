const mealModel = require("../../database/models/meal.model");
const Helper = require("../helper");
const { resHandler } = require("../helper");
class meal {
  static addMeal = async (req, res) => {
    try {
      const mealData = new mealModel({
        userId: req.user._id,
        ...req.body,
      });
      await mealData.save();
      resHandler(res, 200, true, mealData, " meal is added");
    } catch (e) {
      resHandler(res, 500, false, e, e.message, "erro in adding");
    }
  };
  // ***********************************
  static allMeals = async (req, res) => {
    try {
      const allMeals = await mealModel.find();
      
      resHandler(res, 200, true, allMeals, "all meals");
    } catch (e) {
      resHandler(res, 500, false, e, e.message ,"error in all meals");
    }
  };
  // *********************************
  static myMeal = async (req, res) => {
    try {
     
       //const allMeals = awit mealModel.find({userId:req.user._Id}) * get me the meals that has my id 
      // populate : to get relations
       await req.user.populate("myMeal");
      resHandler(res, 200, true, req.user.myMeal, "fetched my meal");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
  // *************************************
  static singleMeal = async (req, res) => {
    try {
      const allMeals = await mealModel.findById(req.params.id);
      resHandler(res, 200, true, allMeals, "single meal ");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
//  ******************************************
  static editMeal = async (req, res) => {
    try {
      const allMeals = await mealModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { runValidators: true }
      );
      resHandler(res, 200, true, allMeals, "edited");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
    g;
  };
  // ****************************************
  static delMeal = async (req, res) => {
    try {
      const allMeals = await mealModel.findByIdAndRemove(req.params.id);
      resHandler(res, 200, true, allMeals, "deleted one ");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
// ***************************************
  static delAllMeals = async (req, res) => {
    try {
      const allMeals = await mealModel.deleteMany();
      resHandler(res, 200, true, allMeals, "deleted all");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
  // ********************
  static updateProfileimg = async (req, res) => {
    try {
      const extension = Helper.fileHandler(req);
      req.user.image = `${process.env.APPUrl}${req.file.filename}.${extension}`;
      await req.user.save();
      Helper.resHandler(res, 200, true, req.user, " update success");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch image");
    }
  };
}
module.exports = meal;

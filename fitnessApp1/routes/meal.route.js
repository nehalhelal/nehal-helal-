const MealController = require("../app/controller/meal.controller")
const upload = require("../app/middleware/upload.middleware");
const auth = require("../app/middleware/auth.middleware")
const router = require("express").Router()

// AUTH to makesure that is user or admin
router.post("/addMeal", auth, MealController.addMeal)
//  USE _Id
router.get("/singleMeal/:id", auth, MealController.singleMeal)
router.get("/", auth, MealController.allMeals)

router.delete("/all/:id", auth, MealController.delMeal)
router.delete("/", auth, MealController.delAllMeals)



router.get("/myMeal", auth, MealController.myMeal)

router.patch(
    "/updateProfileimg",
    auth,
    upload.single("img"),
    MealController.updateProfileimg
  );



module.exports = router
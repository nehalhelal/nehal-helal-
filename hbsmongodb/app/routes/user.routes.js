const UserController = require("../controller/userController");
const router = require("express").Router();

router.get("/", UserController.all);

router.get("/add", UserController.add);
router.get("/addLogic", UserController.addLogic);

router.get("/single/:id", UserController.single);

router.get("/delAll", UserController.delAll);

router.get("/del/:id", UserController.del);
router.get("/showAll", UserController.showAll);

router.get("/edit/:id", UserController.edit);
router.get("/editLogic/:id", UserController.editLogic);

router.get("/addPost", UserController.addPost);
router.post("/addPostLogic", UserController.addPostLogic);

router.get("/editPost", UserController.editPost);
router.post("/editPostLogic", UserController.editPostLogic);

router.get("/status/:id", UserController.status);

router.get("/search", UserController.search);

module.exports = router;

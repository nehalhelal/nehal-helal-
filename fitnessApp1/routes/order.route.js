const OrderController = require("../app/controller/order.controller");
const { auth, authuser } = require("../app/middleware/auth.middleware");
const router = require("express").Router();

router.post("/addOrder", authuser, OrderController.addOrder);
router.get("/singleOrder/:id", OrderController.singleOrder);
router.get("/", OrderController.allOrders);
router.delete("/all/:id", authuser, OrderController.delOrder);
router.delete("/", auth, OrderController.delAllOrders);
router.patch("/single/:id", authuser, OrderController.editOrder);

module.exports = router;

const orderModel = require("../../database/models/order.model");
// to call a of helper
const Helper = require("../helper");
const { resHandler } = require("../helper");
class order {
  static addOrder = async (req, res) => {
    try {
      const orderData = new orderModel({
        userId: req.user._id,
        ...req.body,
      });
      await orderData.save();
      resHandler(res, 200, true, orderData, "  added");
    } catch (e) {
      resHandler(res, 500, false, e, e.message, "erro in adding");
    }
  };

  static allOrders = async (req, res) => {
    try {
      const allOrders = await orderModel.find();
      
      resHandler(res, 200, true, allOrders, "all orders");
    } catch (e) {
      resHandler(res, 500, false, e, e.message ,"error in a all orders");
    }
  };
 

  static singleOrder = async (req, res) => {
    try {
      const allorders = await orderModel.findById(req.params.id);
      resHandler(res, 200, true, allorders, "single order ");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };

  static editOrder = async (req, res) => {
    try {
      const allorders = await orderModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { runValidators: true }
      );
      resHandler(res, 200, true, allorders, "edited");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
    g;
  };

  static delOrder = async (req, res) => {
    try {
      const allorders = await orderModel.findByIdAndRemove(req.params.id);
      resHandler(res, 200, true, allorders, "deleted one ");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
// ***************************************
  static delAllOrders = async (req, res) => {
    try {
      const allorders = await orderModel.deleteMany();
      resHandler(res, 200, true, allorders, "deleted all");
    } catch (e) {
      resHandler(res, 500, false, e, e.message);
    }
  };
  // ********************
 
}
module.exports = order;

const userModel = require("../../database/models/user.model");
const Helper = require("../helper");

class User {
  static register = async (req, res) => {
    try {
      // data from body of postman
      // creat from object model
      const userData = new userModel(req.body);
      await userData.save();
      Helper.resHandler(res, 200, true, userData, "user Add  Successfully");
    } catch (e) {
      Helper.resHandler(res, 500, false, e, "erro  on Adding  ");
    }
  };
  // ******to show all users******************
  static all = async (req, res) => {
    try {
      const userData = await userModel.find();
      Helper.resHandler(res, 200, true, userData, "users featched all ");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch data ");
    }
  };
  // *******************
  static single = async (req, res) => {
    try {
      //                                             remove hash .select('-password') // to choose specific    .select('fname')
      const userData = await userModel.findById(req.params.id);
      Helper.resHandler(res, 200, true, userData, "users featched single data");
    } catch (e) {
      Helper.resHandler(
        res,
        500,
        false,
        e.message,
        "Error featch  single data"
      );
    }
  };
  // ************************************
  // static delete = async (req, res) => {
  //   try {
  //     const userData = await userModel.findByIdAndDelete(req.params.id);
  //     Helper.resHandler(res, 200, true, userData, "users delete ONE NN");
  //   } catch (e) {
  //     Helper.resHandler(res, 500, false, e.message, "Error in DELETE  ONE NNN ");
  //   }
  // };
  // static delAll = async (req, res) => {
  //   try {
  //     const userData = await userModel.deleteMany();
  //     Helper.resHandler(res, 200, true, userData, " delete all N");
  //   } catch (e) {
  //     Helper.resHandler(res, 500, false, e.message, "Error in delete allN ");
  //   }
  // };

  // *************************************
  static delete = async (req, res) => {
    try {
      const userData = await userModel.findByIdAndDelete(req.params.id);
      Helper.resHandler(res, 200, true, userData, "users delete one ");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error delete one  ");
    }
  };
  static delAll = async (req, res) => {
    try {
      await userModel.deleteMany();
      Helper.resHandler(res, 200, true, {}, "user delete all");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error delete all  ");
    }
  };
  // ********************
  static editeSingle = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);
      for (let key in req.body) {
        userData[key] = req.body[key];
      }
      await userData.save();
      Helper.resHandler(res, 200, true, userData, "user edite one  ");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error edite one  ");
    }
  };
  // ********************
  static edite = async (req, res) => {
    try {
      const userData = await userModel.find();
      Helper.resHandler(res, 200, true, userData, "users featched all ");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch data ");
    }
  };
  // ************************
  static login = async (req, res) => {
    try {
      const userData = await userModel.login(req.body.email, req.body.password);

      const token = await userData.generateToken();
      Helper.resHandler(res, 200, true, { userData, token }, "success");
    } catch (e) {
      Helper.resHandler(res, 500, false, e, e.message," not found");
    }






    
  };
  // *****************************
  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
      await req.user.save();
      Helper.resHandler(res, 200, true, {}, "logged out single");
    } catch (e) {
      Helper.resHandler(
        res,
        500,
        false,
        e,
        e.message,
        "error in logout single"
      );
    }
  };
  // ****************************
  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      Helper.resHandler(res, 200, true, {}, "logoutAll");
    } catch (e) {
      Helper.resHandler(res, 500, false, e, e.message, "error in logoutAll");
    }
  };
  // ******************************
  static activate = async (req, res) => {
    try {
      const userData = await userModel.findById(req.params.id);
      userData.status = true;

      await userData.save();
      Helper.resHandler(res, 200, true, userData, "user activate  ");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error activate   ");
    }
  };
  // **********************
  static profile = async (req, res) => {
    Helper.resHandler(res, 200, true, req.user, "hello");
  };
  // *********************
  static updateProfileimg = async (req, res) => {
    try {
      // const fs = require("fs")
      // const extension = req.file.originalname.split(".").pop()
      // const newName = req.file.path+"."+extension
      // fs.renameSync(req.file.path, newName)
      const extension = Helper.fileHandler(req);
      req.user.image = `${process.env.APPUrl}${req.file.filename}.${extension}`;
      await req.user.save();
      Helper.resHandler(res, 200, true, req.user, " update success");
    } catch (e) {
      Helper.resHandler(res, 500, false, e.message, "Error featch image");
    }
  };
}
module.exports = User;

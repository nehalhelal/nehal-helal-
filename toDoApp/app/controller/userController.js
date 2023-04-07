const deal = require("../helper/dealWithJson");
const fileName = "models/users.json";
class User {
  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Data",
    });
  };
  static addLogic = (req, res) => {
    const allUsers = deal.readJsonData(fileName);
    const newUser = { id: Date.now(), ...req.query };
    allUsers.push(newUser);
    deal.writeJsonData(fileName, allUsers);
    res.redirect("/");
  };

  static all = (req, res) => {
    const allUsers = deal.readJsonData(fileName);
    res.render("all", {
      pageTitle: "All Data",
      allUsers,
      hasData: allUsers.length,
    });
  };
  static edit = (req, res) => {
    const id = req.params.id;
    const allUsers = deal.readJsonData(fileName);
    const user = allUsers.find((u) => u.id == id);
    res.render("edit", {
      pageTitle: "Edit Data",
      user,
    });
  };
  static editLogic = (req, res) => {
    const id = req.params.id;
    const allUsers = deal.readJsonData(fileName);
    const index = allUsers.findIndex((u) => u.id == id);
    allUsers[index] = { id, ...req.query };
    deal.writeJsonData(fileName, allUsers);
    res.redirect(`/single/${id}`);
  };
  static single = (req, res) => {
    const id = req.params.id;
    const allUsers = deal.readJsonData(fileName);
    const user = allUsers.find((u) => u.id == id);
    res.render("single", {
      pageTitle: "Single Data",
      user,
    });
  };
  static del = (req, res) => {
    let allUsers = deal.readJsonData(fileName);
    const id = req.params.id;
    allUsers = allUsers.filter((u) => u.id != id);
    deal.writeJsonData(fileName, allUsers);
    res.redirect("/");
  };
  static delAll = (req, res) => {
    deal.writeJsonData(fileName, []);
    res.redirect("/");
  };
  // *********** addpost to bring form*************
  static addPost = (req, res) => {
    res.render("addPost", {
      pageTitle: "Add Data",
    });
  };
  // ****to write *******
  static addPostLogic = (req, res) => {
    const allUsers = deal.readJsonData(fileName);
    const newUser = { id: Date.now(), ...req.body };
    allUsers.push(newUser);
    deal.writeJsonData(fileName, allUsers);
    res.redirect("/");
  };
  // ***********editpost************
  static editPost = (req, res) => {
    const id = req.params.id;
    const allUsers = deal.readJsonData(fileName);
    const user = allUsers.find((u) => u.id == id);
    res.render("editPost", {
      pageTitle: "Edit Data",
      user,
    });
  };

  static editPostLogic = (req, res) => {
    const id = req.params.id;
    const allUsers = deal.readJsonData(fileName);
    const index = allUsers.findIndex((u) => u.id == id);
    // *****req.body*******
    allUsers[index] = { id, ...req.body };
    deal.writeJsonData(fileName, allUsers);
    res.redirect(`/single/${id}`);
  };
  // ******************

  static showAll = (req, res) => {
    const allUsers = deal.readJsonData(fileName);
    res.render("showAll", {
      pageTitle: "show Data",
      allUsers,
      hasData: allUsers.length,
    });
  };

  // **************************

  static status = (req, res) => {
    const allUsers = deal.readJsonData(fileName);
    const id = req.params.id;
    const index = allUsers.findIndex((u) => u.id == id);
    let status = "active";
    if (allUsers[index].status === "inactive") {
      allUsers[index].status = status;
      deal.writeJsonData(fileName, allUsers);
      res.redirect("/");
    }
  };
  // *************** search******************
  static search = (req, res) => {
    let search = req.query.search;
    let results = [];
    const allUsers = deal.readJsonData(fileName);

    for (var i = 0; i < allUsers.length; i++) {
      if (
        allUsers[i].title.includes(search) ||
        allUsers[i].content.includes(search)
      ) {
        results.push(allUsers[i]);
      }
    }
    res.render("search", {
      results,
      hasData: results.length,
    });
  };
}
module.exports = User;

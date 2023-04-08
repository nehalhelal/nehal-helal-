// -----------------------***********

const deal = require("../helper/dealWithJson");
const connectDb = require("../../models/dbconnect");
// const { ObjectId } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const fileName = "models/users.json";
class User {
  static add = (req, res) => {
    res.render("add", {
      pageTitle: "Add Data",
    });
  };

  static addLogic = async (req, res) => {
    try {
      connectDb(async (db) => {
        await db.collection("users").insertOne(req.query);
        res.redirect("/");
      });
    } catch (e) {
      res.send(e);
    }
  };
  // ******************************
  // ************-----------------

  static all = async (req, res) => {
    try {
      connectDb(async (db) => {
        const allUsers = await db.collection("users").find().toArray();
        res.render("all", {
          pageTitle: "All Data",
          allUsers,
          hasData: allUsers.length,
        });
      });
    } catch (e) {
      res.send(e);
    }
  };
  // ***********************
  static edit = async (req, res) => {
    try {
      connectDb(async (db) => {
        const user = await db.collection("users").findOne({
          _id: new ObjectId(req.params.id),
        });
        res.render("edit", {
          pageTitle: "edit Data",
          user,
        });
      });
    } catch (e) {
      res.send(e);
    }
  };
  // *************************************
  // static editLogic = async (req, res) => {
  //   try {
  //     connectDb(
  //       async (db) =>{
  //         const id = req.params.id
  //          const a =await db
  //           .collection("users")
  //           .updateOne(
  //             { _id: new ObjectId(id) },
  //             { $set: { ...req.query } }
  //           )

  //     res.redirect(`/single/${_id}`)
  //     a
  //           })
  //   } catch (e) {
  //     res.send(e.message);
  //   }
  // };
  static editLogic = async (req, res) => {
    try {
      connectDb(
        async (db) =>
          await db
            .collection("users")
            .updateOne({ _id: new ObjectId(req.params.id) })
      );
      res.redirect(`/single/${_id}`);
    } catch (e) {
      res.send(e);
    }
  };

  // *****************************

  static single = async (req, res) => {
    try {
      connectDb(async (db) => {
        const user = await db.collection("users").findOne({
          _id: new ObjectId(req.params.id),
        });
        res.render("single", {
          pageTitle: "Single Data",
          user,
        });
      });
    } catch (e) {
      res.send(e);
    }
  };
  // ************************************
  static del = async (req, res) => {
    try {
      connectDb(
        async (db) =>
          await db
            .collection("users")
            .deleteOne({ _id: new ObjectId(req.params.id) })
      );
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };
  // ************************
  static delAll = async (req, res) => {
    try {
      connectDb(async (db) => await db.collection("users").remove());

      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };
  // *********** addpost to bring form*************
  static addPost = (req, res) => {
    res.render("addPost", {
      pageTitle: "Add Data",
    });
  };
  // ****to write *******
  static addPostLogic = async (req, res) => {
    try {
      connectDb(async (db) => {
        await db.collection("users").insertOne(req.body);
        res.redirect("/");
      });
    } catch (e) {
      res.send(e);
    }
  };
  // ***********editpost************
  static editPost = async (req, res) => {
    try {
      connectDb(async (db) => {
        const user = await db.collection("users").findOne({
          _id: new ObjectId(req.params.id),
        });
        res.render("editPost", {
          pageTitle: "Edit Data",
          user,
        });
      });
    } catch (e) {
      res.send(e);
    }
  };

  // static editPostLogic = async (req, res) => {
  //   try {
  //     connectDb(async (db) => {
  //       await db.collection("users").insertOne(req.body);
  //       res.redirect(`/single/${_id}`);
  //     });
  //   } catch (e) {
  //     res.send(e);
  //   }
  // };
  static editPostLogic = async (req, res) => {
    try {
      connectDb(async (db) => {
        await db.collection("users").insertOne(req.body);
        res.redirect(`/single/${_id}`);
      });
    } catch (e) {
      res.send(e);
    }
  };

  // ******************

  static showAll = async (req, res) => {
    try {
      connectDb(async (db) => {
        const allUsers = await db.collection("users").find().toArray();
        res.render("showAll", {
          pageTitle: "show Data",
          allUsers,
          hasData: allUsers.length,
        });
      });
    } catch (e) {
      res.send(e);
    }
  };

  // **************************

  static status = async (req, res) => {
    try {
      connectDb(async (db) => {
        let status = "active";
        if (allUsers[index].status === "inactive") {
          allUsers[index].status = status;
          await db
            .collection("users")
            .updateOne({ _id: new ObjectId(req.params.id) });
        }

        res.redirect("/");
      });
    } catch (e) {
      res.send(e);
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

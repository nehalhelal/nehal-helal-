const deal = require("./dealWithjson");
const userHeads = ["id", "name", "age", "email"];
const createObj = (data) => {
  const userData = {};
  userHeads.forEach((h) => {
    if (h == "id") userData[h] = Date.now();
    else userData[h] = data[h];
    //{id:Date.now, name:"",, age:66, email:""}
  });
  return userData;
};
class User {
  static addUser = (argv) => {
    const userData = createObj(argv);
    const data = deal.readJsonData("user.json");
    data.push(userData);
    deal.writeJsonData("user.json", data);
  };
  static showAll = () => {
    const allUsers = deal.readJsonData("user.json");
    if (!allUsers.length) {
      console.log("No users yet");
      return;
    }
    allUsers.forEach((u, ind) => {
      console.log(`${ind + 1} - ${u.name} - ${u.id} - ${u.email}`);
    });
  };
  static showSingle = (argv) => {
    const allUsers = deal.readJsonData("user.json");
    const singleUser = allUsers.find((u) => u.id == argv.id);
    if (!singleUser) console.log("no user");
    else console.log(singleUser);
  };

  static deletAll = (argv) => {
    const userData = createObj(argv);
    const data = deal.readJsonData("user.json");
    data.splice(userData);
    deal.writeJsonData("user.json", data);
  };

  static deletSingle = (argv) => {
    const allUsers = deal.readJsonData("user.json");
    data.forEach((e, i) => {
      if (e.id == argv.id) {
        data.splice(i, 1);
        deal.writeJsonData("user.json", data);
      }
    });
  };
  static edituser = (argv) => {
    const userData = createObj(argv);
    const data = deal.readJsonData("users.json");
    data.forEach((u, i) => {
      if (u.id == argv.id) {
        data[i] = userData;
        return data[i];
      }
    });
    deal.writeJsonData("user.json", data);
  };
}

module.exports = User;

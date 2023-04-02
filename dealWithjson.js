const fs = require("fs");
class DealWthJson {
  static writejsondata = (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data));
  };

  static readJsonData = (fileName) => {
    let result;
    try {
      result = JSON.parse(fs.readFileSync(fileName));
      if (!Array.isArray(result)) throw new console.error("not an array");
    } catch (e) {
      result = [];
    }
    return result;
  };
  static editUser = (argv) => {
    const userRecord = createUserObjectData(argv)
    const data = rwData.readJsonData('users.json')
    data.forEach((u, i) => {
        if (u.id == argv.id) {
            data[i] = userRecord
            return data[i]
        };
    })
    rwData.writeJsonData('users.json', data)

}
}


module.exports = DealWthJson;

// TO USE IN ALL API

const fs = require("fs")
class Helper {
  static resHandler = (res, statusCode, apiStatus, data, message) => {
    // satus isfunction
    res.status(statusCode).send({ apiStatus, data, message });
  };


  static fileHandler = (req)=>{
    const extension = req.file.originalname.split(".").pop()
    const newName = req.file.path+"."+extension
    fs.renameSync(req.file.path, newName)
    return extension
}
}

module.exports = Helper;

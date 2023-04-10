
require("dotenv").config();


const app = require("./app/src");


app.listen(process.env.PORT, () =>
  console.log(`http://localhost:${process.env.PORT}`)
);

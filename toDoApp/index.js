const app = require("./app/src");

require("dotenv").config();

app.listen(process.env.PORT, () =>
  console.log(`http://localhost:${process.env.PORT}`)
);

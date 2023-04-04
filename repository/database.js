const sql = require("sequelize");
const database = new sql("kosa", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

database
  .authenticate()
  .then(() => {
    console.log("connected to database successfully.");
  })
  .catch((error) => {
    console.error("unable to connect to database:" + error);
  });

module.exports = database;
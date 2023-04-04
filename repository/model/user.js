const { Sql, DataTypes } = require("sequelize");
const database = require("../database");

const user = database.define("user", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
  type: DataTypes.STRING,
  allowNull: false,
   },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type:  DataTypes.STRING,
    allowNull: false,
  },
  
});

user
  .sync()
  .then(() => {
    console.log("table created successfully!");
  })
  .catch((error) => {
    console.error("unable to create table: ", +error);
  });

module.exports = user;
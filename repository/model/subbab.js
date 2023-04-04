const { Sql, DataTypes } = require("sequelize");
const database = require("../database");

const subbab = database.define("subbab", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  belongTo: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

subbab
  .sync()
  .then(() => console.log("table created successfully"))
  .catch((error) => console.log("error creating table: " + error));

module.exports = subbab;
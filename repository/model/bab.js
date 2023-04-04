const { Sql, DataTypes } = require("sequelize");
const database = require("../database");

const bab = database.define("bab", {
  
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subjudul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kesimpulan: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

bab
  .sync()
  .then(() => console.log("table created successfully"))
  .catch((error) => console.log("error creating table: " + error));

module.exports = bab;
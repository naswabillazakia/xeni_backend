const Sequelize = require("sequelize");
const config = require("../config/db");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  // operatorsAliases: false,
  operatorAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {}

db.sequelize = sequelize;
db.sequelize = sequelize;

db.kata = require("./model/kata")(sequelize, Sequelize);
db.quiz = require("./model/quiz")(sequelize, Sequelize);
db.user = require("./model/user")(sequelize, Sequelize);

//drop and resync with { force: false }
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});


module.exports = db;
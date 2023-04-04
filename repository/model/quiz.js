const { sql, DataTypes } = require('sequelize')
const database = require('../database')

const quiz = database.define('quiz', {
    quiz: {
        type: DataTypes.STRING,
    },
    a: {
        type: DataTypes.STRING,
    },
    b: {
        type: DataTypes.STRING,
    },
    c: {
        type: DataTypes.STRING,
    },
    d: {
        type: DataTypes.STRING,
    },
    key: {
        type: DataTypes.STRING,
    },
    categoryId: {
        type: DataTypes.INTEGER,
    },
    levelId: {
        type: DataTypes.INTEGER,
    },
})
quiz
    .sync()
    .then(() => {
        console.log("table created successfully")
    })
    .catch((error) => {
        console.error("unable to create table: ", +error)
    })

module.exports = quiz;
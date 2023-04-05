const Quiz = (sequelize, DataTypes) => {
    const Quiz = sequelize.define('quiz', {
        question: {
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
    });
    return Quiz;
};

module.exports = Quiz;
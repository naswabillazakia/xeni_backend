const Kata = (sequelize, DataTypes) => {
    const Kata = sequelize.define('kata', {
        word: {
            type: DataTypes.STRING,
        },
        makna: {
            type: DataTypes.STRING,
        },
    });
    return Kata;
};

module.exports = Kata;
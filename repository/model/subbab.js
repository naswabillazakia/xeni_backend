const subbab = (sequelize, DataTypes) => {
  const Subbab = sequelize.define('subbab', {
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Subbab;
}

module.exports = subbab;
const bab = (sequelize, DataTypes) => {
  const Bab = sequelize.define('bab', {
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjudul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kesimpulan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subbabId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference : {
        model: 'subbab',
        key: 'id',
      }, 
    },
  });
  return Bab;
};

module.exports = bab;
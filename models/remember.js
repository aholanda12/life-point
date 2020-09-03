module.exports = function(sequelize, DataTypes) {
  const Remember = sequelize.define("Remember", {
    one: { type: DataTypes.STRING },
    two: { type: DataTypes.STRING },
    three: { type: DataTypes.STRING },
    four: { type: DataTypes.STRING },
    five: { type: DataTypes.STRING }
  });
  Remember.associate = function(models) {
    Remember.belongsTo(models.Journal, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Remember;
};

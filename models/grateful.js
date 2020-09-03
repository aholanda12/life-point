module.exports = function(sequelize, DataTypes) {
  const Grateful = sequelize.define("Grateful", {
    one: { type: DataTypes.STRING },
    two: { type: DataTypes.STRING },
    three: { type: DataTypes.STRING },
    four: { type: DataTypes.STRING },
    five: { type: DataTypes.STRING }
  });
  Grateful.associate = function(models) {
    Grateful.belongsTo(models.Journal, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Grateful;
};

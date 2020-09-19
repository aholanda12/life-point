// Model for the list of things to be grateful for
module.exports = function(sequelize, DataTypes) {
  const Grateful = sequelize.define("Grateful", {
    one: { type: DataTypes.STRING },
    two: { type: DataTypes.STRING },
    three: { type: DataTypes.STRING },
    four: { type: DataTypes.STRING },
    five: { type: DataTypes.STRING }
  });
  // Grateful is associated with the journal it is submitted with
  Grateful.associate = function(models) {
    Grateful.belongsTo(models.Journal, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Grateful;
};

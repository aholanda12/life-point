// Model for the journal entry
module.exports = function(sequelize, DataTypes) {
  const Journal = sequelize.define("Journal", {
    entry: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING }
  });
    // Journal is associated with the User it is submitted by, tied to Mood, Grateful, and Remember it is submitted with
  Journal.associate = function(models) {
    Journal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Journal.hasMany(models.Mood, {
      onDelete: "cascade"
    });
    Journal.hasMany(models.Grateful, {
      onDelete: "cascade"
    });
    Journal.hasMany(models.Remember, {
      onDelete: "cascade"
    });
  };
  return Journal;
};

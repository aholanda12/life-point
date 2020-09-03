module.exports = function(sequelize, DataTypes) {
  const Journal = sequelize.define("Journal", {
    entry: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE }
  });

  return Journal;
};

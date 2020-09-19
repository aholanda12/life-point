// Model for the affirmations
module.exports = function(sequelize, DataTypes) {
  const Affirmation = sequelize.define("Affirmation", {
    quote: { type: DataTypes.STRING }
  });

  return Affirmation;
};

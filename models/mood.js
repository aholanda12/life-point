// Model for moods and habits
module.exports = function(sequelize, DataTypes) {
  const Mood = sequelize.define("Mood", {
    mood: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    medication: { type: DataTypes.BOOLEAN },
    hoursSleep: { type: DataTypes.INTEGER },
    minutesExercise: { type: DataTypes.INTEGER },
    minutesNapping: { type: DataTypes.INTEGER },
    servingsCaffiene: { type: DataTypes.INTEGER },
    servingsAlcohol: { type: DataTypes.INTEGER },
    hoursTV: { type: DataTypes.INTEGER },
    showered: { type: DataTypes.BOOLEAN },
    brushedTeeth: { type: DataTypes.BOOLEAN },
    selfCare: { type: DataTypes.BOOLEAN },
    minutesSocial: { type: DataTypes.INTEGER },
    headache: { type: DataTypes.BOOLEAN },
    nausea: { type: DataTypes.BOOLEAN },
    exhaustion: { type: DataTypes.BOOLEAN },
    insomnia: { type: DataTypes.BOOLEAN },
    appetite: { type: DataTypes.INTEGER },
    menstruation: { type: DataTypes.BOOLEAN }
  });
    // Mood is associated with the journal it is submitted with
  Mood.associate = function(models) {
    Mood.belongsTo(models.Journal, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Mood;
};

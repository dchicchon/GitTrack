'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define('Cohort', {
    name: DataTypes.STRING,
    numberStudents: DataTypes.INTEGER,
    instructorID: DataTypes.INTEGER
  }, {});

  // I want to associate a cohort with an instructor ID
  Cohort.associate = function (models) {
    // associations can be defined here
    
    // This is how you would normally create the association. However, not every user will have a Cohort. Only users with the type of 'instructor' will have a cohort. Is it possible to associate a User only if they have a specific type? A question for a later time
    // Cohort.belongsTo(models.User)
  };
  return Cohort;
};
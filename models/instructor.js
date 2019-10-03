'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define('Instructor', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING
  }, {});
  Instructor.associate = function(models) {
      Instructor.hasMany(models.Cohort)
    // associations can be defined here
  };
  return Instructor;
};
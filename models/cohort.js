'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define('Cohort', {
    name: DataTypes.STRING,
    numberStudents: DataTypes.INTEGER,
    instructorID: DataTypes.INTEGER
  }, {});
  Cohort.associate = function(models) {
    // associations can be defined here
  };
  return Cohort;
};
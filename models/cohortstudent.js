'use strict';
module.exports = (sequelize, DataTypes) => {
  const CohortStudent = sequelize.define('CohortStudent', {
    cohortID: DataTypes.INTEGER,
    studentID: DataTypes.INTEGER
  }, {});
  
  CohortStudent.associate = function(models) {
    // associations can be defined here
  };
  return CohortStudent;
};
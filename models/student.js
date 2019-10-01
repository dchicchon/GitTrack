'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    githubUsername: DataTypes.STRING,
    userType: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};
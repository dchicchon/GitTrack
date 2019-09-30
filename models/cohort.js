'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define('Cohort', {
    name: DataTypes.STRING
  }, {});
  Cohort.associate = function(models) {
    // associations can be defined here
    Cohort.belongsTo(models.User)

  };
  return Cohort;
};
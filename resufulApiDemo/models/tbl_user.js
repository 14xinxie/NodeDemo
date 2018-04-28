'use strict';

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
      field: 'user_name'
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
      field: 'user_pwd'
    }
  }, {
      underscored: true,
      paranoid: true,
      tableName: 'tbl_user'
    });
  return User;
}
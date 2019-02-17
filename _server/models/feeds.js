const bcrypt = require('bcryptjs');

('use strict');
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'feeds',
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      familyCode: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      imageFile: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      username: DataTypes.STRING
    }
  );
  return users;
};
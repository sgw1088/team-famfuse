const bcrypt = require('bcryptjs');

('use strict');
module.exports = (sequelize, DataTypes) => {
  var images = sequelize.define(
    'images',
    {
      imageId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      file: {
        allowNull: false,
        type: DataTypes.STRING
      },
      familyCode: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }
  );
  return images;
};
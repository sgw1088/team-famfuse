const bcrypt = require('bcryptjs');

('use strict');
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      childUser: DataTypes.STRING,
      parentUser: DataTypes.STRING,
      password: {
          type: DataTypes.STRING,
          allowNull: false },
      familyCode: {
        allowNull: false,
        type: DataTypes.INTEGER
        },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      username: DataTypes.STRING
    },
   
    
  );
  users.prototype.comparePassword = function(plainTextPassword) {
    let user = this;
    console.log('users/models comparePassword');
    return bcrypt.compareSync(plainTextPassword, user.password);
  };

  users.associate = function(models) {
    users.hasMany(models.todos, {
        foreignKey: 'userId'
    });
  };

  return users;
};


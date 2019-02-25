'use strict';
module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define(
    'todos',
    {
      todoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,     
      todoName: DataTypes.STRING,
      todoDetails: DataTypes.STRING,
      todoStatus: DataTypes.STRING,
      dueDate: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      Deleted: DataTypes.BOOLEAN,
},
  );
  todos.associate = function(models) {
    todos.belongsTo(models.users, {
        foreignKey: 'userId'
    });
  };
  return todos;
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    guid: {
      type: Sequelize.UUID.V4,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    confirmPassword: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    profilePicture:{
      type: Sequelize.BLOB('long'),
      allowNull: true
    },
    ip_address:{
      type: Sequelize.STRING(250),
      allowNull: true
    },
    login_on: {
      type: Sequelize.DataTypes.DATE(7),
      allowNull: true
    },
    lastLoginOn: {
      type: Sequelize.DataTypes.DATE(7),
      allowNull: true
    },
    createdOn: {
      type: Sequelize.DataTypes.DATE(7),
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    updatedOn: {
      type: Sequelize.DataTypes.DATE(7),
      allowNull: true,
    },
    updatedBy: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
}
export async function down(queryInterface) {
  await queryInterface.dropTable('users');
}

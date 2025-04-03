'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('groups', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    adminId: {
      type: Sequelize.UUID.V4,
      allowNull: false,
      references: {
        model: 'users',
        key: 'guid',
      },
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
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
    }
  });
};

export async function down(queryInterface) {
  await queryInterface.dropTable('groups');
}


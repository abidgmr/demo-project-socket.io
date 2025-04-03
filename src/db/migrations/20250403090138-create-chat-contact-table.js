'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('chat_contact', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    currentUserId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    isMuted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isArchived: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isBlocked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdOn: {
      type: Sequelize.DataTypes.DATE(7),
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.STRING(255),
      allowNull: false
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
  })
};

export async function down(queryInterface) {
  await queryInterface.dropTable('chat_contact');
};

/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('chat_contacts', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          unique: true
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
    } catch (error) {
      console.log("Migration error", error)
    }
  },


 async down(queryInterface) {
    try {
      await queryInterface.dropTable('chat_contacts');
    } catch (error) {
      console.log("Migration error", error);
    }
  }
};

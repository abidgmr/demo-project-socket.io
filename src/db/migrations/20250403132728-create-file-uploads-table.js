'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('file_uploads', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    messageId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'messages',
        key: 'id',
      },
    },
    chatId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'messages',
        key: 'chatContactId',
      },
    },
    groupChatId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'messages',
        key: 'groupId',
      },
    },
    chatUserId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'messages',
        key: 'chatContactUserId',
      },
    },
    groupChatUserId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'messages',
        key: 'groupMemberUserId',
      },
    },
    currentUserId: {
      type: Sequelize.INTEGER,
      allowNull: true
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
  await queryInterface.dropTable('file_uploads');
}


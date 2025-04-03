'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('messages', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    chatContactId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'chat_contact',
        key: 'id',
      },
    },
    chatContactUserId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'chat_contact',
        key: 'userId',
      },
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    groupMemberId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'group_members',
        key: 'id',
      },
    },
    groupMemberUserId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'group_members',
        key: 'userId',
      },
    },
    currentUserId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    message: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    fileId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'file_uploads',
        key: 'id',
      },
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

  });
};

export async function down(queryInterface) {
  await queryInterface.dropTable('chat_contact');
}


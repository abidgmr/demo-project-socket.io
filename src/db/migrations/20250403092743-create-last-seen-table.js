'use strict';

/** @type {import('sequelize-cli').Migration} */

  export async function up (queryInterface, Sequelize) {
    await queryInterface.createTable('last_seen', 
      { 
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
        status: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        lastSeenOn: {
          type: Sequelize.DataTypes.DATE(7),
          allowNull: true,
        },
        updatedOn: {
          type: Sequelize.DataTypes.DATE(7),
          allowNull: true,
        },
      }
    
    );
  };

  export async function down (queryInterface) {
    await queryInterface.dropTable('last_seen');
  }

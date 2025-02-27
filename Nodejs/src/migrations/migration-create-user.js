'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			fullName: {
				type: Sequelize.STRING,
			},
			phoneNumber: {
				type: Sequelize.STRING,
			},
			gender: {
				type: Sequelize.STRING, // Nam, Nữ, Khác
			},
			role: {
				type: Sequelize.STRING, // Admin, Khách
			},
			image: {
				type: Sequelize.TEXT,
			},
			activationState: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};

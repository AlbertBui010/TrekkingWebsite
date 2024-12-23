'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Guides', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			fullName: {
				type: Sequelize.STRING,
			},
			expertGuideDescription: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			phoneNumber: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			activationState: {
				type: Sequelize.STRING, // hide / show
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
		await queryInterface.dropTable('Guides');
	},
};

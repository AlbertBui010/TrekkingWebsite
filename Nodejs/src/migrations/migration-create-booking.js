'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Bookings', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			tourId: {
				type: Sequelize.INTEGER,
			},
			number_of_tickets: {
				type: Sequelize.INTEGER,
			},
			total_price: {
				type: Sequelize.BIGINT,
			},
			status: {
				type: Sequelize.STRING, // ('register','confirm', 'cancel')
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
		await queryInterface.dropTable('Bookings');
	},
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Tours', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tourName: {
				type: Sequelize.STRING,
			},
			tourDescription: {
				type: Sequelize.TEXT,
			},
			outdoorActivityTypeId: {
				type: Sequelize.INTEGER,
			},
			image: {
				type: Sequelize.TEXT,
			},
			guideId: {
				type: Sequelize.INTEGER,
			},
			best_month: {
				type: Sequelize.STRING,
			},
			max_guests: {
				type: Sequelize.INTEGER,
			},
			current_number_guest: {
				type: Sequelize.INTEGER,
			},
			pickup_time: {
				type: Sequelize.STRING,
			},
			pickup_location: {
				type: Sequelize.STRING,
			},
			group_assembly_area: {
				type: Sequelize.STRING,
			},
			conquest_duration: {
				type: Sequelize.STRING,
			},
			medical_access_time: {
				type: Sequelize.STRING,
			},
			distance: {
				type: Sequelize.INTEGER,
			},
			peak_altitude: {
				type: Sequelize.STRING,
			},
			activity_duration: {
				type: Sequelize.STRING,
			},
			schedule_detail: {
				type: Sequelize.TEXT,
			},
			price: {
				type: Sequelize.BIGINT,
			},
			status: {
				type: Sequelize.STRING, // Available , Ongoing, Finished
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
		await queryInterface.dropTable('Tours');
	},
};

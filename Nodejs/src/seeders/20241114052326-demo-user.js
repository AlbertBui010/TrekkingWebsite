'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Users', [
			{
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
				address: {
					type: Sequelize.STRING,
				},
				phoneNumber: {
					type: Sequelize.STRING,
				},
				gender: {
					type: Sequelize.BOOLEAN,
				},
				roleId: {
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
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Users', null, {});
	},
};

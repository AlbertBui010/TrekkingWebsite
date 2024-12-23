'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Booking.init(
		{
			userId: DataTypes.INTEGER,
			tourId: DataTypes.INTEGER,
			number_of_tickets: DataTypes.INTEGER,
			total_price: DataTypes.BIGINT,
			status: DataTypes.STRING, // ('register','confirm', 'cancel')
			activationState: DataTypes.STRING, // hide / show
		},
		{
			sequelize,
			modelName: 'Booking',
		},
	);
	return Booking;
};

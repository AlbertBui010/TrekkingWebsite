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
			// Define association to User
			Booking.belongsTo(models.User, {
				foreignKey: 'userId',
				as: 'user', // Alias for the associated user
			});

			// Define association to Tour
			Booking.belongsTo(models.Tour, {
				foreignKey: 'tourId',
				as: 'tour', // Alias for the associated tour
			});
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

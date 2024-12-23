'use strict';
const { Model, DECIMAL } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tour extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.OutdoorActivityType, {
				foreignKey: 'outdoorActivityTypeId',
				as: 'activityType', // Alias for the association
			});

			// A Tour belongs to a Guide
			this.belongsTo(models.Guide, {
				foreignKey: 'guideId',
				as: 'guide', // Alias for the association
			});
		}
	}
	Tour.init(
		{
			tourName: DataTypes.STRING,
			outdoorActivityTypeId: DataTypes.INTEGER,
			image: DataTypes.TEXT,
			tourDescription: DataTypes.TEXT,

			guideId: DataTypes.INTEGER,
			// tour summary
			best_month: DataTypes.STRING,
			max_guests: DataTypes.INTEGER,
			current_number_guest: DataTypes.INTEGER,
			pickup_time: DataTypes.STRING,
			pickup_location: DataTypes.STRING,
			group_assembly_area: DataTypes.STRING,
			conquest_duration: DataTypes.STRING,

			medical_access_time: DataTypes.STRING,
			distance: DataTypes.STRING,
			peak_altitude: DataTypes.STRING,
			activity_duration: DataTypes.STRING,

			schedule_detail: DataTypes.TEXT, // markdown
			price: DataTypes.BIGINT,
			status: DataTypes.STRING, // Available , Ongoing, Finished
			activationState: DataTypes.STRING, // hide / show
		},
		{
			sequelize,
			modelName: 'Tour',
		},
	);
	return Tour;
};

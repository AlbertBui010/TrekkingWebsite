'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Guide extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// A Guide has many Tours
			this.hasMany(models.Tour, {
				foreignKey: 'guideId',
				as: 'tours', // Alias for the association
			});
		}
	}
	Guide.init(
		{
			fullName: DataTypes.STRING,
			expertGuideDescription: DataTypes.STRING,
			image: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			activationState: DataTypes.STRING, // hide / show
		},
		{
			sequelize,
			modelName: 'Guide',
		},
	);
	return Guide;
};

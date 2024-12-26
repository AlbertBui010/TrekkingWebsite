'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class OutdoorActivityType extends Model {
		static associate(models) {
			this.hasMany(models.Tour, {
				foreignKey: 'outdoorActivityTypeId',
				as: 'tours',
			});
		}
	}
	OutdoorActivityType.init(
		{
			name: DataTypes.STRING,
			typeDescription: DataTypes.TEXT,
			activationState: DataTypes.STRING, // Show (default) / Hide
		},
		{
			sequelize,
			modelName: 'OutdoorActivityType',
		},
	);
	return OutdoorActivityType;
};

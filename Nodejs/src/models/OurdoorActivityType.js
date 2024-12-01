'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class OutdoorActivityType extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	OutdoorActivityType.init(
		{
			name: DataTypes.STRING,
			typeDescription: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'OutdoorActivityType',
		},
	);
	return OutdoorActivityType;
};

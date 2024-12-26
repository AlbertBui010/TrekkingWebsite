'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Information extends Model {
		static associate(models) {}
	}
	Information.init(
		{
			typeInformation: DataTypes.STRING,
			content: DataTypes.TEXT,
			activationState: DataTypes.STRING, // Show (default) / Hide
		},
		{
			sequelize,
			modelName: 'Information',
		},
	);
	return Information;
};

'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			fullName: DataTypes.STRING,
			phoneNumber: DataTypes.STRING,
			gender: DataTypes.STRING, // Nam, Nữ, Khác
			role: DataTypes.STRING, // Admin, Khách
			image: DataTypes.TEXT,
			activationState: DataTypes.STRING, // hide / show
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
	return User;
};

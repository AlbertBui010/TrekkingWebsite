const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('webtrekking', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306,
	logging: false, // Don't display SQL queries in console
});

let connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

module.exports = connectDB;

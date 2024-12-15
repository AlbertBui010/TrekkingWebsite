import db from '../models';
const moment = require('moment-timezone');

let createNewTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			// tourName: DataTypes.STRING,
			// outdoorActivityTypeId: DataTypes.INTEGER,
			// image: DataTypes.STRING,

			// guideId: DataTypes.INTEGER,
			// // tour summary
			// best_month: DataTypes.STRING,
			// max_guests: DataTypes.INTEGER,
			// current_number_guest: DataTypes.INTEGER,
			// pickup_time: DataTypes.STRING,
			// pickup_location: DataTypes.STRING,
			// group_assembly_area: DataTypes.STRING,
			// conquest_duration: DataTypes.STRING,

			// medical_access_time: DataTypes.STRING,
			// distance: DataTypes.STRING,
			// peak_altitude: DataTypes.STRING,
			// activity_duration: DataTypes.STRING,

			// schedule_detail: DataTypes.TEXT, // markdown
			// price: DataTypes.STRING,
			const requiredField = [
				'tourName',
				'outdoorActivityTypeId',
				'tourDescription',
				'image',
				'guideId',
				'best_month',
				'max_guests',
				'pickup_time',
				'pickup_location',
				'group_assembly_area',
				'conquest_duration',
				'medical_access_time',
				'distance',
				'peak_altitude',
				'activity_duration',
				'schedule_detail',
				'price',
			];

			const missingField = requiredField.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameters!',
				});
			}

			let tour = await db.Tour.findOne({
				where: {
					tourName: data.tourName,
					pickup_time: data.pickup_time,
				},
			});

			if (tour) {
				resolve({
					errCode: 2,
					errMessage: 'Tour already existed',
				});
			} else {
				const vietnamTime = moment.utc().tz('Asia/Ho_Chi_Minh').toDate();
				const newTour = await db.Tour.create({
					...data,
					createdAt: vietnamTime,
				});
				resolve({
					errCode: 0,
					data: newTour,
					errMessage: 'Create tour successfully',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let updateTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredField = [
				'id',
				'tourName',
				'outdoorActivityTypeId',
				'image',
				'guideId',
				'best_month',
				'max_guests',
				'pickup_time',
				'pickup_location',
				'group_assembly_area',
				'conquest_duration',
				'medical_access_time',
				'distance',
				'peak_altitude',
				'activity_duration',
				'schedule_detail',
				'price',
			];

			const missingField = requiredField.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameters!',
				});
			}

			let result = await db.Tour.update(data, {
				where: { id: data.id },
			});

			if (result == 1) {
				resolve({
					errCode: 0,
					errMessage: 'Update tour successfully',
				});
			} else {
				resolve({
					errCode: 0,
					errMessage: 'Update tour failed',
				});
			}
		} catch (e) {
			console.log(e);
			reject(e);
		}
	});
};

let deleteTourServices = async (tourId) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (tourId !== null) {
				let res = await db.Tour.destroy({
					where: { id: tourId },
				});

				if (res) {
					resolve({
						errCode: 0,
						errMessage: 'Delete tour successfully!',
					});
				} else {
					resolve({
						errCode: 2,
						errMessage: 'Delete tour failed!',
					});
				}
			} else {
				resolve({
					errCode: 1,
					errMessage: 'Missing parameters!',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getAllTourServices = async (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let tours;
			if (id === 'ALL') {
				tours = await db.Tour.findAll({
					include: [
						{
							model: db.OutdoorActivityType,
							as: 'activityType',
						},
						{
							model: db.Guide,
							as: 'guide', // Alias defined in the association
							attributes: ['id', 'fullName', 'expertGuideDescription', 'phoneNumber', 'image'], // Select fields
						},
					],
				});
			} else {
				tours = await db.Tour.findOne({
					where: { id: id },
					include: [
						{
							model: db.OutdoorActivityType,
							as: 'activityType',
						},
						{
							model: db.Guide,
							as: 'guide',
							attributes: ['id', 'fullName', 'expertGuideDescription', 'phoneNumber', 'image'],
						},
					],
				});
			}

			resolve({
				errCode: 0,
				data: tours ? tours : [],
			});
		} catch (e) {
			console.log('ERROR:', e);
			reject(e);
		}
	});
};

let getAllActivityTypeServices = async (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			let types = {};
			if (id === 'ALL') {
				types = await db.OutdoorActivityType.findAll({
					include: {
						model: db.Tour,
						as: 'tours',
					},
				});
			} else {
				types = await db.OutdoorActivityType.findOne({
					where: { id: id },
					include: {
						model: db.Tour,
						as: 'tours',
					},
				});
			}
			resolve({
				errCode: 0,
				type: types ? types : [],
			});
		} catch (e) {
			console.log('ERROR:', e);
			reject(e);
		}
	});
};
module.exports = {
	createNewTourServices,
	updateTourServices,
	deleteTourServices,
	getAllTourServices,
	getAllActivityTypeServices,
};

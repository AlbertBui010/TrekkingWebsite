import db from '../models';

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
				const newTour = await db.Tour.create(data);
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
				'id',
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
			reject(e);
		}
	});
};

let deleteTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (data && data.id) {
				let res = await db.Tour.destroy({
					where: { id: data.id },
				});

				if (res) {
					resolve({
						errCode: 0,
						errMessage: 'Delete tour successfully!',
					});
				} else {
					resolve({
						errCode: 0,
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

let getAllTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let tours;
			if (data && data.id === 'ALL') {
				tours = await db.Tour.findAll({
					raw: true,
				});
			} else if (data && data.id) {
				tours = await db.Tour.findOne({
					where: { id: data.id },
					raw: true,
				});
			}

			resolve({
				errCode: 0,
				data: tours ? tours : [],
			});
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	createNewTourServices,
	updateTourServices,
	deleteTourServices,
	getAllTourServices,
};

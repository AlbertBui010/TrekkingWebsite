import db from '../models';

// CREATE TOUR
let createTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = [
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
				'status', // Available , Ongoing, Finished
				'activationState', // hide / show
			];

			const missingField = requiredFields.find((field) => !data[field]);
			if (missingField) {
				return resolve({
					errCode: 1,
					errMessage: `Missing parameter: ${missingField}`,
				});
			}

			const existingTour = await db.Tour.findOne({
				where: {
					tourName: data.tourName,
					pickup_time: data.pickup_time,
				},
			});

			if (existingTour) {
				return resolve({
					errCode: 2,
					errMessage: 'Tour already exists!',
				});
			}

			const newTour = await db.Tour.create({ ...data, current_number_guest: 0 });

			resolve({
				errCode: 0,
				data: newTour,
				errMessage: 'Tour created successfully!',
			});
		} catch (error) {
			reject({
				errCode: -1,
				errMessage: 'Error from server!',
				error: error.message,
			});
		}
	});
};

// UPDATE TOUR
let updateTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = [
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
				'status',
				'activationState',
			];

			const missingField = requiredFields.find((field) => !data[field]);
			if (missingField) {
				return resolve({
					errCode: 1,
					errMessage: `Missing parameter: ${missingField}`,
				});
			}

			const [updatedCount] = await db.Tour.update(data, {
				where: { id: data.id },
			});

			if (updatedCount === 1) {
				return resolve({
					errCode: 0,
					errMessage: 'Tour updated successfully',
				});
			} else {
				return resolve({
					errCode: 2,
					errMessage: 'Tour update failed or no changes detected',
				});
			}
		} catch (error) {
			console.error(error);
			reject({
				errCode: -1,
				errMessage: 'Error from server!',
				error: error.message,
			});
		}
	});
};

// DELETE TOUR
let deleteTourServices = async (tourId) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!tourId) {
				return resolve({
					errCode: 1,
					errMessage: 'Missing parameters!',
				});
			}

			const deletedCount = await db.Tour.destroy({
				where: { id: tourId },
			});

			if (deletedCount > 0) {
				resolve({
					errCode: 0,
					errMessage: 'Delete tour successfully!',
				});
			} else {
				resolve({
					errCode: 2,
					errMessage: 'Delete tour failed or tour not found!',
				});
			}
		} catch (e) {
			console.error(e);
			reject({
				errCode: -1,
				errMessage: 'Error from server!',
				error: e.message,
			});
		}
	});
};

// GET ALL
let getAllTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let tours;

			if (data.id === 'ALL') {
				if (data.activationState !== 'undefined') {
					tours = await db.Tour.findAll({
						where: { activationState: data.activationState },
						include: [
							{
								model: db.OutdoorActivityType,
								as: 'activityType',
							},
							{
								model: db.Guide,
								as: 'guide',
							},
						],
					});
				} else {
					tours = await db.Tour.findAll({
						include: [
							{
								model: db.OutdoorActivityType,
								as: 'activityType',
							},
							{
								model: db.Guide,
								as: 'guide',
							},
						],
					});
				}
			} else if (data && data.id) {
				if (data.activationState !== 'undefined') {
					tours = await db.Tour.findOne({
						where: { id: data.id, activationState: data.activationState },
						include: [
							{
								model: db.OutdoorActivityType,
								as: 'activityType',
							},
							{
								model: db.Guide,
								as: 'guide',
							},
						],
					});
				} else {
					tours = await db.Tour.findOne({
						where: { id: data.id },
						include: [
							{
								model: db.OutdoorActivityType,
								as: 'activityType',
							},
							{
								model: db.Guide,
								as: 'guide',
							},
						],
					});
				}
			} else {
				resolve({
					errCode: 1,
					errMessage: 'Missing required parameters!',
				});
				return;
			}

			resolve({
				errCode: 0,
				data: tours || [],
			});
		} catch (e) {
			console.log('Error from server:', e);
			return reject(e);
		}
	});
};

module.exports = {
	createTourServices,
	updateTourServices,
	deleteTourServices,
	getAllTourServices,
};

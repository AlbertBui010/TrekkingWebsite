const db = require('../models');

// CREATE
let createOutdoorActivityTypeServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = ['name', 'typeDescription', 'activationState'];
			const missingField = requiredFields.find((field) => !data[field]);

			if (missingField) {
				return resolve({
					errCode: 2,
					errMessage: `Missing input parameter: ${missingField}`,
				});
			}

			const existingActivityType = await db.OutdoorActivityType.findOne({
				where: { name: data.name },
			});

			if (existingActivityType) {
				return resolve({
					errCode: 1,
					errMessage: 'Activity type already exists!',
				});
			}

			let res = await db.OutdoorActivityType.create({
				name: data.name,
				typeDescription: data.typeDescription,
				activationState: data.activationState || 'Show',
			});

			return resolve({
				errCode: 0,
				errMessage: 'Activity type created successfully!',
				data: res['dataValues'],
			});
		} catch (e) {
			console.log('Error from server:', e);
			return reject(e);
		}
	});
};

// GET ALL
let getAllOutdoorActivityTypeServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let activityTypes;

			if (data.id === 'ALL') {
				if (data.activationState !== 'undefined') {
					activityTypes = await db.OutdoorActivityType.findAll({
						where: { activationState: data.activationState },
						include: [
							{
								model: db.Tour,
								as: 'tours',
							},
						],
					});
				} else {
					activityTypes = await db.OutdoorActivityType.findAll({
						include: [
							{
								model: db.Tour,
								as: 'tours',
							},
						],
					});
				}
			} else if (data && data.id) {
				activityTypes = await db.OutdoorActivityType.findOne({
					where: { id: data.id },
					include: [
						{
							model: db.Tour,
							as: 'tours',
						},
					],
				});
			} else {
				return resolve({
					errCode: 1,
					errMessage: 'Missing required parameters!',
				});
			}

			return resolve({
				errCode: 0,
				data: activityTypes ? activityTypes : [],
			});
		} catch (e) {
			console.log('Error from server:', e);
			return reject(e);
		}
	});
};

// UPDATE
let updateOutdoorActivityTypeServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				return resolve({
					errCode: 2,
					errMessage: 'Missing required parameter: id',
				});
			}

			const activityType = await db.OutdoorActivityType.findOne({
				where: { id: data.id },
			});

			if (!activityType) {
				return resolve({
					errCode: 1,
					errMessage: 'Activity type not found!',
				});
			}

			await activityType.update({
				name: data.name || activityType.name,
				typeDescription: data.typeDescription || activityType.typeDescription,
				activationState: data.activationState || activityType.activationState,
			});

			return resolve({
				errCode: 0,
				errMessage: 'Activity type updated successfully!',
			});
		} catch (e) {
			console.log('Error from server:', e);
			return reject(e);
		}
	});
};

// DELETE
let deleteOutdoorActivityTypeServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				return resolve({
					errCode: 2,
					errMessage: 'Missing required parameter: id',
				});
			}

			const activityType = await db.OutdoorActivityType.findOne({
				where: { id: data.id },
			});

			if (!activityType) {
				return resolve({
					errCode: 1,
					errMessage: 'Activity type not found!',
				});
			}

			await activityType.destroy();

			return resolve({
				errCode: 0,
				errMessage: 'Activity type deleted successfully!',
			});
		} catch (e) {
			console.log('Error from server:', e);
			return reject(e);
		}
	});
};

module.exports = {
	getAllOutdoorActivityTypeServices,
	createOutdoorActivityTypeServices,
	updateOutdoorActivityTypeServices,
	deleteOutdoorActivityTypeServices,
};

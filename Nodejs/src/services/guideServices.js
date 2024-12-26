import db from '../models';

// CREATE GUIDE
let createGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredField = ['phoneNumber', 'fullName', 'expertGuideDescription', 'image'];
			const missingField = requiredField.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 2,
					errMessage: `Missing input parameter: ${missingField}`,
				});
				return;
			}

			let guide = await db.Guide.findOne({
				where: { phoneNumber: data.phoneNumber },
			});

			if (guide) {
				return resolve({
					errCode: 1,
					errMessage: 'Guide already exists',
				});
			}

			await db.Guide.create({
				fullName: data.fullName,
				expertGuideDescription: data.expertGuideDescription,
				phoneNumber: data.phoneNumber,
				image: data.image,
				activationState: 'Show',
			});

			resolve({
				errCode: 0,
				errMessage: 'Create new guide successfully',
			});
		} catch (error) {
			console.error('Error creating user:', error);
			reject({
				errCode: -1,
				errMessage: 'An error occurred while creating the guide.',
			});
		}
	});
};

// UPDATE GUIDE
let updateGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredField = ['id', 'phoneNumber', 'fullName', 'expertGuideDescription', 'image'];
			const missingField = requiredField.find((field) => !data[field]);
			if (missingField) {
				return resolve({
					errCode: 2,
					errMessage: `Missing parameter: ${missingField}`,
				});
			}

			let [updatedCount] = await db.Guide.update(data, { where: { id: data.id } });

			if (updatedCount === 1) {
				return resolve({
					errCode: 0,
					errMessage: 'Update guide successfully',
				});
			} else {
				return resolve({
					errCode: 1,
					errMessage: 'Update guide failed',
				});
			}
		} catch (e) {
			return reject(e);
		}
	});
};

// DELETE GUIDE
let deleteGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				return resolve({
					errCode: 2,
					errMessage: 'Missing required parameter: id',
				});
			}

			let deletedCount = await db.Guide.destroy({
				where: { id: data.id },
			});

			if (deletedCount === 1) {
				return resolve({
					errCode: 0,
					errMessage: 'Delete guide successfully',
				});
			} else {
				return resolve({
					errCode: 1,
					errMessage: 'Delete guide failed',
				});
			}
		} catch (e) {
			return reject(e);
		}
	});
};

// GET ALL GUIDE
let getAllGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let guides;

			if (data.id === 'ALL') {
				if (data.activationState !== 'undefined') {
					guides = await db.Guide.findAll({
						where: { activationState: data.activationState },
					});
				} else {
					guides = await db.Guide.findAll();
				}
			} else if (data && data.id) {
				guides = await db.Guide.findOne({
					where: { id: data.id },
				});
			} else {
				return resolve({
					errCode: 1,
					errMessage: 'Missing required parameters!',
				});
			}

			return resolve({
				errCode: 0,
				data: guides ? guides : [],
			});
		} catch (e) {
			return reject(e);
		}
	});
};

module.exports = {
	createGuideServices,
	updateGuideServices,
	deleteGuideServices,
	getAllGuideServices,
};

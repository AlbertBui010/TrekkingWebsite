import db from '../models';

let createGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredField = ['phoneNumber', 'fullName', 'expertGuideDescription', 'image'];
			const missingField = requiredField.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 2,
					errMessage: 'Missing parameters!',
				});
			}

			let guide = await db.Guide.findOne({
				where: { phoneNumber: data.phoneNumber },
				raw: true,
			});

			if (guide) {
				resolve({
					errCode: 1,
					errMessage: 'User already exists',
				});
			} else {
				await db.Guide.create({
					fullName: data.fullName,
					expertGuideDescription: data.expertGuideDescription,
					phoneNumber: data.phoneNumber,
					image: data.image,
				});

				resolve({
					errCode: 0,
					errMessage: 'Create guide successfully',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let updateGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let guide = await db.Guide.update(
				{
					fullName: data.fullName,
					expertGuideDescription: data.expertGuideDescription,
					image: data.image,
					phoneNumber: data.phoneNumber,
				},
				{
					where: { id: data.id },
				},
			);

			if (guide == 1) {
				resolve({
					errCode: 0,
					errMessage: 'Update guide successfully',
				});
			} else {
				resolve({
					errCode: 1,
					errMessage: 'Update guide failed',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let deleteGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let guide = await db.Guide.destroy({
				where: { id: data.id },
			});
			if (guide == 1) {
				resolve({
					errCode: 0,
					errMessage: 'Delete guide successfully',
				});
			} else {
				resolve({
					errCode: 1,
					errMessage: 'Delete guide failed',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let getAllGuideServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let guides;
			if (data && data.id === 'ALL') {
				guides = await db.Guide.findAll({
					raw: true,
				});
			} else {
				guides = await db.Guide.findOne({
					where: { id: data.id },
					raw: true,
				});
			}

			resolve({
				errCode: 0,
				data: guides ? guides : [],
			});
		} catch (e) {
			reject(e);
		}
	});
};
module.exports = {
	createGuideServices,
	updateGuideServices,
	deleteGuideServices,
	getAllGuideServices,
};

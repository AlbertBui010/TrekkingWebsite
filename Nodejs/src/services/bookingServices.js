import db from '../models';

let createBookingServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = [
				'userId',
				'tourId',
				'number_of_tickets',
				'total_price',
				'status',
				'activationState',
			];
			const missingField = requiredFields.find((field) => !data[field]);

			if (missingField) {
				resolve({
					errCode: 2,
					errMessage: `Missing input parameter: ${missingField}`,
				});
				return;
			}

			let res = await db.Booking.create({
				userId: data.userId,
				tourId: data.tourId,
				number_of_tickets: data.number_of_tickets,
				total_price: data.total_price,
				status: data.status, // ('register','confirm', 'cancel')
				activationState: data.activationState,
			});

			return resolve({
				errCode: 0,
				errMessage: 'Create booking successfully',
				data: res['dataValues'],
			});
		} catch (e) {
			return reject(e);
		}
	});
};

let getAllBookingServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let bookings;
			const userAttributes = { exclude: ['password'] };
			if (data && data.id === 'ALL') {
				if (data.activationState !== 'undefined') {
					bookings = await db.Booking.findAll({
						where: { activationState: data.activationState },
						include: [
							{
								model: db.User,
								as: 'user',
								attributes: userAttributes,
							},
							{
								model: db.Tour,
								as: 'tour',
							},
						],
					});
				} else {
					bookings = await db.Booking.findAll({
						include: [
							{
								model: db.User,
								as: 'user',
								attributes: userAttributes,
							},
							{
								model: db.Tour,
								as: 'tour',
							},
						],
					});
				}
			} else if (data && data.id) {
				if (data.activationState !== 'undefined') {
					bookings = await db.Booking.findOne({
						where: {
							id: data.id,
							activationState: data.activationState,
						},
						include: [
							{
								model: db.User,
								as: 'user',
								attributes: userAttributes,
							},
							{
								model: db.Tour,
								as: 'tour',
							},
						],
					});
				} else {
					bookings = await db.Booking.findAll({
						where: { id: data.id },
						include: [
							{
								model: db.User,
								as: 'user',
								attributes: userAttributes,
							},
							{
								model: db.Tour,
								as: 'tour',
							},
						],
					});
				}
			} else {
				return resolve({
					errCode: 1,
					errMessage: 'Missing required parameters!',
				});
			}

			return resolve({
				errCode: 0,
				data: bookings ? bookings : [],
			});
		} catch (e) {
			return reject(e);
		}
	});
};

let getAllBookingServicesByUserId = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let bookings;
			if (data && data.userId) {
				if (data.activationState !== 'undefined') {
					bookings = await db.Booking.findAll({
						where: { userId: data.userId, activationState: data.activationState },
						include: [
							{
								model: db.Tour,
								as: 'tour',
							},
						],
					});
				} else {
					bookings = await db.Booking.findAll({
						where: { userId: data.userId },
						include: [
							{
								model: db.Tour,
								as: 'tour',
							},
						],
					});
				}
			} else {
				return resolve({
					errCode: 1,
					errMessage: 'Missing required parameters!',
				});
			}

			return resolve({
				errCode: 0,
				data: bookings ? bookings : [],
			});
		} catch (e) {
			return reject(e);
		}
	});
};

let updateBookingServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				return resolve({
					errCode: 1,
					errMessage: 'Missing required parameters: id!',
				});
			}

			const booking = await db.Booking.findOne({
				where: {
					id: data.id,
				},
			});
			if (!booking) {
				return resolve({
					errCode: 2,
					errMessage: 'Booking not found!',
				});
			}

			await booking.update(data);

			return resolve({
				errCode: 0,
				errMessage: 'User updated successfully!',
			});
		} catch (e) {
			console.log('Error from server:', e);
			return reject(e);
		}
	});
};

let deleteBookingServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				return resolve({
					errCode: 1,
					errMessage: 'Missing required parameters: id!',
				});
			}

			const booking = await db.Booking.findOne({
				where: {
					id: data.id,
				},
			});

			if (!booking) {
				return resolve({
					errCode: 2,
					errMessage: 'Booking not found!',
				});
			}

			await booking.destroy();

			return resolve({
				errCode: 0,
				errMessage: 'Booking deleted successfully!',
			});
		} catch (e) {
			return reject(e);
		}
	});
};

module.exports = {
	createBookingServices,
	getAllBookingServices,
	getAllBookingServicesByUserId,
	updateBookingServices,
	deleteBookingServices,
};

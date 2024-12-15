import db from '../models/index';
import bcrypt from 'bcrypt';
import { fileLoader } from 'ejs';
const salt = bcrypt.genSaltSync(10);

let handleLoginService = async (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = {};
			let user = await db.User.findOne({
				where: { email: email },
				raw: true,
			});

			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					data.errCode = 0;
					data.errMessage = 'OK';
					delete user.password; // delete password from user object before sending to client
					data.user = user;
				} else {
					data.errCode = 2;
					data.errMessage = 'Wrong password!';
				}
			} else {
				data.errCode = 1;
				data.errMessage = 'User not found!';
			}

			resolve(data);
		} catch (e) {
			reject(e);
		}
	});
};

let getAllUserService = async (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = '';
			if (userId === 'ALL') {
				users = await db.User.findAll({
					attributes: {
						exclude: ['password'],
					},
				});
			}
			if (userId && userId !== 'ALL') {
				users = await db.User.findOne({
					where: { id: userId },
					attributes: { exclude: ['password'] },
				});
			}
			resolve(users);
		} catch (e) {
			reject(e);
		}
	});
};

let handleCreateNewUserService = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredField = ['fullName', 'email', 'password', 'phoneNumber', 'gender'];
			const missingField = requiredField.find((field) => !data[field]);
			if (missingField) {
				resolve({
					errCode: 2,
					errMessage: 'Missing input parameters!',
				});
			}
			let user = await db.User.findOne({
				where: { email: data.email },
			});

			if (user) {
				resolve({
					errCode: 1,
					errMessage: 'User already exists!',
				});
			} else {
				let hashPasswd = bcrypt.hashSync(data.password, salt);
				let image = '',
					role = 'Khách';

				if (data.image !== null || data.role !== null) {
					image = data.image;
					role = data.role;
				}
				await db.User.create({
					email: data.email,
					password: hashPasswd,
					fullName: data.fullName,
					phoneNumber: data.phoneNumber,
					gender: data.gender, // Nam, Nữ, Khác
					role: role, // Khách default
					image: image,
				});
				resolve({
					errCode: 0,
					errMessage: 'Create new user successfully!',
				});
			}
		} catch (e) {
			reject(e);
		}
	});
};

let handleUpdateUserService = async (data) => {
	return new Promise((resolve, reject) => {
		try {
		} catch (e) {
			reject(e);
		}
	});
};

let handleOrderBookingService = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (data.ticket_count > 0) {
				let res = await db.Booking.insert({
					userId: data.userId,
					tourId: data.tourId,
					number_of_tickets: data.ticket_count,
				});
				resolve(res);
				console.log(res);
			}
		} catch (e) {
			resolve(e);
		}
	});
};
module.exports = {
	getAllUserService: getAllUserService,
	handleLoginService: handleLoginService,
	handleCreateNewUserService: handleCreateNewUserService,
	handleOrderBookingService,
	handleOrderBookingService,
};

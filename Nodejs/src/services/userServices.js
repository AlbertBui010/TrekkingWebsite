import db from '../models/index';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

// CREATE USER
const handleCreateUserServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = ['fullName', 'email', 'password', 'phoneNumber', 'gender'];
			const missingField = requiredFields.find((field) => !data[field]);

			if (missingField) {
				resolve({
					errCode: 2,
					errMessage: `Missing input parameter: ${missingField}`,
				});
				return;
			}

			const user = await db.User.findOne({
				where: { email: data.email },
			});

			if (user) {
				resolve({
					errCode: 1,
					errMessage: 'User already exists!',
				});
				return;
			}

			const hashedPassword = bcrypt.hashSync(data.password, salt);

			await db.User.create({
				email: data.email,
				password: hashedPassword,
				fullName: data.fullName,
				phoneNumber: data.phoneNumber,
				gender: data.gender, // Nam, Nữ, Khác
				role: data.role || 'Khách', // Mặc định là 'Khách'
				image: data.image || '',
				activationState: 'Show',
			});

			resolve({
				errCode: 0,
				errMessage: 'Create new user successfully!',
			});
		} catch (error) {
			console.error('Error creating user:', error);
			reject({
				errCode: -1,
				errMessage: 'An error occurred while creating the user.',
			});
		}
	});
};

// GET ALL USERS
let getAllUserServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users;

			if (data?.id === 'ALL') {
				const whereClause = {}; // Điều kiện mặc định

				if (data.activationState !== undefined) {
					whereClause.activationState = data.activationState; // Lọc theo trạng thái ẩn
				}

				users = await db.User.findAll({
					where: whereClause,
					attributes: {
						exclude: ['password'],
					},
				});
			}
			// Trường hợp: Lấy người dùng theo `id`
			else if (data && data.id) {
				users = await db.User.findOne({
					where: { id: data.id },
					attributes: {
						exclude: ['password'],
					},
				});
			}
			// Trường hợp: Không có tham số hợp lệ
			else {
				return resolve({
					errCode: 1,
					errMessage: 'Missing required parameters!',
				});
			}

			// Trả về kết quả
			return resolve({
				errCode: 0,
				data: users ? users : [],
			});
		} catch (e) {
			return reject(e);
		}
	});
};

// UPDATE USER
const handleUpdateUserServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 2,
					errMessage: 'Missing required parameter: id',
				});
				return;
			}

			const user = await db.User.findOne({
				where: { id: data.id },
			});

			if (!user) {
				return resolve({
					errCode: 1,
					errMessage: 'User not found!',
				});
			}

			await user.update({
				email: data.email || user.email,
				fullName: data.fullName || user.fullName,
				phoneNumber: data.phoneNumber || user.phoneNumber,
				gender: data.gender || user.gender,
				role: data.role || user.role,
				image: data.image || user.image,
				activationState: data.activationState || user.activationState,
			});

			resolve({
				errCode: 0,
				errMessage: 'User updated successfully!',
			});
		} catch (e) {
			console.error('Error updating user:', e);
			reject({
				errCode: -1,
				errMessage: 'An error occurred while updating the user.',
			});
		}
	});
};

let handleLoginServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.email || !data.password) {
				return resolve({
					errCode: 2,
					errMessage: 'Missing required parameters!',
				});
			}

			let res = {};

			let user = await db.User.findOne({
				where: { email: data.email },
				raw: true,
			});

			if (user) {
				if (bcrypt.compareSync(data.password, user.password) && user.activationState) {
					res.errCode = 0;
					res.errMessage = 'OK';

					delete user.password;
					res.user = user;
					resolve(res);
				} else {
					res.errCode = 2;
					res.errMessage = 'Incorrect password or the account is not activated.';
					resolve(res);
				}
			} else {
				res.errCode = 1;
				res.errMessage = 'User not found!';
				resolve(res);
			}
		} catch (e) {
			console.error('Error logging in:', e);
			reject(e);
		}
	});
};

// DELETE USER
const handleDeleteUserServices = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (!data.id) {
				resolve({
					errCode: 2,
					errMessage: 'Missing required parameter: id',
				});
				return;
			}

			const user = await db.User.findOne({
				where: { id: data.id },
			});

			if (!user) {
				resolve({
					errCode: 1,
					errMessage: 'User not found!',
				});
				return;
			}

			await user.destroy();

			resolve({
				errCode: 0,
				errMessage: 'User deleted successfully!',
			});
		} catch (e) {
			console.error('Error deleting user:', e);
			reject({
				errCode: -1,
				errMessage: 'An error occurred while deleting the user.',
			});
		}
	});
};

module.exports = {
	handleLoginServices,
	getAllUserServices,
	handleCreateUserServices,
	handleUpdateUserServices,
	handleDeleteUserServices,
};

// handle login
// get all user
// handle create new user
// handle delete user
// handle edit user
import userServices from '../services/userServices';

let helloWorld = async (req, res) => {
	try {
		return res.status(200).json({
			errCode: 0,
			errMessage: 'HELLO WORLD FROM SERVER',
		});
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal Server Error',
		});
	}
};

let handleLogin = async (req, res) => {
	try {
		let email = req.body.email;
		let password = req.body.password;

		if (!email || !password) {
			return res.status(200).json({
				errCode: 3,
				errMessage: 'Missing inputs parameter!',
			});
		}

		let data = await userServices.handleLoginService(email, password);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error logging in:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let getAllUser = async (req, res) => {
	try {
		let id = req.body.id;
		if (!id) {
			return res.status(200).json({
				errCode: 1,
				errMessage: 'Missing required parameters',
				data: [],
			});
		}

		let data = await userServices.getAllUserService(req.body.id);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error getting all users:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleCreateNewUser = async (req, res) => {
	try {
		let data = await userServices.handleCreateNewUserService(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error creating new user:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleUpdateUser = async (req, res) => {
	try {
		let data = await userServices.handleUpdateUserService(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error updating user:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleOrderBooking = async (req, res) => {
	try {
		let data = await userServices.handleOrderBookingService(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error Order Booking:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};
module.exports = {
	helloWorld,
	getAllUser: getAllUser,
	handleLogin: handleLogin,
	handleCreateNewUser: handleCreateNewUser,
	handleUpdateUser: handleUpdateUser,
	handleOrderBooking: handleOrderBooking,
};

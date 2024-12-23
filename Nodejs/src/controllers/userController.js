import userServices from '../services/userServices';

let handleCreateUser = async (req, res) => {
	try {
		let data = await userServices.handleCreateUserServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error creating new user:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleGetAllUser = async (req, res) => {
	try {
		let data = await userServices.getAllUserServices(req.query);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error getting all users:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleUpdateUser = async (req, res) => {
	try {
		let data = await userServices.handleUpdateUserServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error updating user:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleDeleteUser = async (req, res) => {
	try {
		let data = await userServices.handleDeleteUserServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error delete user:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleLogin = async (req, res) => {
	try {
		let data = await userServices.handleLoginServices(email, password);
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error logging in:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

module.exports = {
	handleGetAllUser,
	handleLogin,
	handleCreateUser,
	handleUpdateUser,
	handleDeleteUser,
};

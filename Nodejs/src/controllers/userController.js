// handle login
// get all user
// handle create new user
// handle delete user
// handle edit user
import userServices from '../services/userServices';

let getAllUser = async (req, res) => {
	try {
		let data = await userServices.getAllUserService();
		return res.status(200).json(data);
	} catch (e) {
		console.error('Error getting all users:', e);
		return res.status(500).json({
			message: 'Internal server error',
		});
	}
};

module.exports = {
	getAllUser: getAllUser,
};

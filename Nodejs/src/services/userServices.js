import db from '../models';

let getAllUserService = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await db.User.findAll();
			resolve(data);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	getAllUserService: getAllUserService,
};

import OutdoorActivityTypeServices from '../services/outdoorActivityTypeServices';

let handleCreateOutdoorActivityType = async (req, res) => {
	try {
		let data = await OutdoorActivityTypeServices.createOutdoorActivityTypeServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: 500,
			message: 'Internal error',
		});
	}
};

let handleGetAllOutdoorActivityType = async (req, res) => {
	try {
		let data = await OutdoorActivityTypeServices.getAllOutdoorActivityTypeServices(req.query);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: 500,
			message: 'Internal error',
		});
	}
};

let handleUpdateOutdoorActivityType = async (req, res) => {
	try {
		let data = await OutdoorActivityTypeServices.updateOutdoorActivityTypeServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: 500,
			message: 'Internal error',
		});
	}
};

let handleDeleteOutdoorActivityType = async (req, res) => {
	try {
		let data = await OutdoorActivityTypeServices.deleteOutdoorActivityTypeServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: 500,
			message: 'Internal error',
		});
	}
};

module.exports = {
	handleCreateOutdoorActivityType,
	handleGetAllOutdoorActivityType,
	handleUpdateOutdoorActivityType,
	handleDeleteOutdoorActivityType,
};

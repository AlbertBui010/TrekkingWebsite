import tourServices from '../services/tourServices';

// add
let handleCreateNewTour = async (req, res) => {
	try {
		let data = await tourServices.createNewTourServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

// get all
let handleGetAllTour = async (req, res) => {
	try {
		let data = await tourServices.getAllTourServices(req.query.id);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

// edit
let handleUpdateTour = async (req, res) => {
	try {
		let data = await tourServices.updateTourServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

// delete
let handleDeleteTour = async (req, res) => {
	try {
		console.log('CHECK CONTROLLER', req.body.id);
		let data = await tourServices.deleteTourServices(req.body.id);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

// get by type
let handleGetAllActivityType = async (req, res) => {
	try {
		let data = await tourServices.getAllActivityTypeServices(req.query.id);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};
module.exports = {
	handleCreateNewTour,
	handleGetAllTour,
	handleDeleteTour,
	handleUpdateTour,
	handleGetAllActivityType,
};

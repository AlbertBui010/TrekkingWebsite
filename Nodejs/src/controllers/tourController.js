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
		let data = await tourServices.getAllTourServices(req.body);
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
		let data = await tourServices.deleteTourServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

// get by type

module.exports = {
	handleCreateNewTour,
	handleGetAllTour,
	handleDeleteTour,
	handleUpdateTour,
};

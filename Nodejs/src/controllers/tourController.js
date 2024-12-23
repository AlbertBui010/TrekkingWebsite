import tourServices from '../services/tourServices';

// CREATE
let handleCreateTour = async (req, res) => {
	try {
		let data = await tourServices.createTourServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

// GET ALL
let handleGetAllTour = async (req, res) => {
	try {
		let data = await tourServices.getAllTourServices(req.query);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

// UPDATE
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

// DELETE
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

module.exports = {
	handleCreateTour,
	handleGetAllTour,
	handleDeleteTour,
	handleUpdateTour,
};

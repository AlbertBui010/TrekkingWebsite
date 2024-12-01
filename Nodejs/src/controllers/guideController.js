import guideServices from '../services/guideServices';

let handleCreateGuide = async (req, res) => {
	try {
		let data = await guideServices.createGuideServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleUpdateGuide = async (req, res) => {
	try {
		let data = await guideServices.updateGuideServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleDeleteGuide = async (req, res) => {
	try {
		let data = await guideServices.deleteGuideServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};

let handleGetAllGuide = async (req, res) => {
	try {
		let data = await guideServices.getAllGuideServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Internal server error',
		});
	}
};
module.exports = {
	handleCreateGuide,
	handleUpdateGuide,
	handleDeleteGuide,
	handleGetAllGuide,
};

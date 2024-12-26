import bookingServices from '../services/bookingServices';

let handleCreateBooking = async (req, res) => {
	try {
		let data = await bookingServices.createBookingServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

let handleGetAllBooking = async (req, res) => {
	try {
		let data = await bookingServices.getAllBookingServices(req.query);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

let handleUpdateBooking = async (req, res) => {
	try {
		let data = await bookingServices.updateBookingServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

let handleDeleteBooking = async (req, res) => {
	try {
		let data = await bookingServices.deleteBookingServices(req.body);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};

let handleGetAllBookingByUserId = async (req, res) => {
	try {
		let data = await bookingServices.getAllBookingServicesByUserId(req.query);
		return res.status(200).json(data);
	} catch (e) {
		console.log('Error:', e);
		return res.status(500).json({
			errCode: -1,
			errMessage: 'Error from server',
		});
	}
};
module.exports = {
	handleCreateBooking,
	handleGetAllBooking,
	handleUpdateBooking,
	handleDeleteBooking,
	handleGetAllBookingByUserId,
};

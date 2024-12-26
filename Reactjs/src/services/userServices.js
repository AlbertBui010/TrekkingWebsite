import axios from '../axios';

const handleRegisterServices = (data) => axios.post('/register', data);

const handleLoginServices = (data) => axios.post('/login', data);

const handleGetAllUserServices = (data) => axios.get(`/get-all-user?id=${data}`);

const handleUpdateUserServices = (data) => axios.put(`/update-user`, data);

// BOOKING
const handleCreateBookingServices = (data) => axios.post('/create-booking', data);
const handleUpdateBookingServices = (data) => axios.put('/update-booking', data);
const handleGetAllBookingByUserIdServices = (data) =>
	axios.get(`/get-all-booking-by-user-id?userId=${data.userId}&activationState=${data.activationState}`);

export {
	handleLoginServices,
	handleRegisterServices,
	handleGetAllUserServices,
	handleUpdateUserServices,
	// booking
	handleCreateBookingServices,
	handleUpdateBookingServices,
	handleGetAllBookingByUserIdServices,
};

import axios from '../axios';

let handleLoginServices = (data) => {
	return axios.post('/login', data);
};

let handleRegisterService = (data) => {
	return axios.post('/create-new-user', data);
};

let handlegetAllUserServices = (data) => {
	return axios.get(`/get-all-user?id=${data}`);
};

let handleBookingService = (data) => {
	return axios.post(`/order-booking-tour`, data);
};

let handleUpdateUserServices = (data) => {
	return axios.put(`/update-user`, data);
};

export {
	handleLoginServices,
	handleRegisterService,
	handlegetAllUserServices,
	handleBookingService,
	handleUpdateUserServices,
};

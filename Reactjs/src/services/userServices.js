import { data } from 'react-router-dom';
import axios from '../axios';

let handleLoginService = (data) => {
	return axios.post('/login', data);
};

let handleRegisterService = (data) => {
	return axios.post('/create-new-user', data);
};

let handleGetAllUserService = (data) => {
	return axios.get(`/get-all-user?id=${data}`);
};

let handleBookingService = (data) => {
	return axios.post(`/order-booking-tour`, data);
};

export { handleLoginService, handleRegisterService, handleGetAllUserService, handleBookingService };

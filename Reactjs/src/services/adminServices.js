import axios from '../axios';

// TOUR
let handleGetAllToursServices = (data) =>
	axios.get(`/get-all-tour?id=${data.id}&activationState=${data.activationState}`);

let handleDeleteTourService = (data) => axios.post(`/delete-tour`, data);

let handleUpdateTourServices = (data) => axios.put('/update-tour', data);

let handleCreateTourServices = (data) => axios.post('/create-tour', data);

// GUIDE
let handleCreateGuideService = (guideInfo) => axios.post('/create-guide', guideInfo);

let handleDeleteGuideService = (guideId) => axios.post('/delete-guide', guideId);

let handleUpdateGuideServices = (guide) => axios.put('/update-guide', guide);

let handleGetAllGuidesServices = (data) =>
	axios.get(`/get-all-guide?id=${data.id}&activationState=${data.activationState}`);

// Outdoor Activity Type
let handleCreateOutdoorActivityTypeServices = (data) => axios.post('/create-outdoor-activity-type', data);
let handleDeleteOutdoorActivityTypeServices = (data) => axios.post('/delete-outdoor-activity-type', data);
let handleUpdateOutdoorActivityTypeServices = (data) => axios.put('/update-outdoor-activity-type', data);
let handleGetAllOutdoorActivityTypeServices = (data) =>
	axios.get(`/get-all-outdoor-activity-type?id=${data.id}&activationState=${data.activationState}`);

// Booking
let handleGetAllBookingServices = (data) =>
	axios.get(`/get-all-booking?id=${data.id}&activationState=${data.activationState}`);

// USER
let handleGetAllUserServices = (data) =>
	axios.get(`/get-all-user?id=${data.id}&activationState=${data.activationState}`);

export {
	handleGetAllToursServices,
	handleDeleteTourService,
	handleUpdateTourServices,
	handleGetAllGuidesServices,
	handleCreateTourServices,
	handleCreateGuideService,
	handleDeleteGuideService,
	handleUpdateGuideServices,
	// Activity Type
	handleCreateOutdoorActivityTypeServices,
	handleDeleteOutdoorActivityTypeServices,
	handleUpdateOutdoorActivityTypeServices,
	handleGetAllOutdoorActivityTypeServices,
	// Booking
	handleGetAllBookingServices,

	// User
	handleGetAllUserServices,
};

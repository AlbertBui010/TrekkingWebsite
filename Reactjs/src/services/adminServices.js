import axios from '../axios';

// tour
let handleGetAllTours = (data) => {
	return axios.get(`/get-all-tour?id=${data}`);
};

let handleDeleteTourService = (data) => {
	return axios.post(`/delete-tour`, data);
};

let handleUpdateTour = (data) => {
	return axios.put('/update-tour', data);
};

let handleCreateTour = (tour) => {
	return axios.post('/create-new-tour', tour);
};

// activity type
let handleGetAllActivityType = (data) => {
	return axios.get(`/get-all-activity-type?id=${data}`);
};

let handleGetAllGuides = (data) => {
	return axios.get(`/get-all-guide?id=${data}`);
};

// guide
let handleCreateGuideService = (guideInfo) => {
	return axios.post('/create-new-guide', guideInfo);
};

let handleDeleteGuideService = (guideId) => {
	return axios.post('/delete-guide', guideId);
};

let handleUpdateGuideService = (guide) => {
	return axios.put('/update-guide', guide);
};

export {
	handleGetAllTours,
	handleGetAllActivityType,
	handleDeleteTourService,
	handleUpdateTour,
	handleGetAllGuides,
	handleCreateTour,
	handleCreateGuideService,
	handleDeleteGuideService,
	handleUpdateGuideService,
};

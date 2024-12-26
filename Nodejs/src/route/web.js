import express from 'express';
import userController from '../controllers/userController';
import guideController from '../controllers/guideController';
import tourController from '../controllers/tourController';
import outdoorActivityTypeController from '../controllers/outdoorActivityTypeController';
import bookingController from '../controllers/bookingController';
let router = express.Router();

let initWebRoutes = (app) => {
	// REGISTER
	router.post('/api/register', userController.handleCreateUser);

	// LOGIN
	router.post('/api/login', userController.handleLogin);

	// USER
	router.get('/api/get-all-user', userController.handleGetAllUser);
	router.post('/api/create-user', userController.handleCreateUser);
	router.put('/api/update-user', userController.handleUpdateUser);
	router.post('/api/delete-user', userController.handleDeleteUser);

	// GUIDE
	router.get('/api/get-all-guide', guideController.handleGetAllGuide);
	router.post('/api/create-guide', guideController.handleCreateGuide);
	router.put('/api/update-guide', guideController.handleUpdateGuide);
	router.post('/api/delete-guide', guideController.handleDeleteGuide);

	// OUTDOOR_ACTIVITY_TYPE
	router.post('/api/create-outdoor-activity-type', outdoorActivityTypeController.handleCreateOutdoorActivityType);
	router.get('/api/get-all-outdoor-activity-type', outdoorActivityTypeController.handleGetAllOutdoorActivityType);
	router.put('/api/update-outdoor-activity-type', outdoorActivityTypeController.handleUpdateOutdoorActivityType);
	router.post('/api/delete-outdoor-activity-type', outdoorActivityTypeController.handleDeleteOutdoorActivityType);

	// BOOKING
	router.post('/api/create-booking', bookingController.handleCreateBooking);
	router.get('/api/get-all-booking', bookingController.handleGetAllBooking);
	router.put('/api/update-booking', bookingController.handleUpdateBooking);
	router.post('/api/delete-booking', bookingController.handleDeleteBooking);
	router.get('/api/get-all-booking-by-user-id', bookingController.handleGetAllBookingByUserId);

	// TOUR
	router.post('/api/create-tour', tourController.handleCreateTour);
	router.get('/api/get-all-tour', tourController.handleGetAllTour);
	router.put('/api/update-tour', tourController.handleUpdateTour);
	router.post('/api/delete-tour', tourController.handleDeleteTour);

	return app.use('/', router);
};

module.exports = initWebRoutes;

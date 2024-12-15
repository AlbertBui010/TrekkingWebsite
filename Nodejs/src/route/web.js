import express from 'express';
import userController from '../controllers/userController';
import guideController from '../controllers/guideController';
import tourController from '../controllers/tourController';

let router = express.Router();

let initWebRoutes = (app) => {
	// API
	router.get('/', userController.helloWorld); // test

	router.post('/api/login', userController.handleLogin);
	router.get('/api/get-all-user', userController.getAllUser);
	router.post('/api/create-new-user', userController.handleCreateNewUser);
	router.put('/api/update-user', userController.handleUpdateUser);

	router.get('/api/get-all-guide', guideController.handleGetAllGuide);
	router.post('/api/create-new-guide', guideController.handleCreateGuide);
	router.put('/api/update-guide', guideController.handleUpdateGuide);
	router.post('/api/delete-guide', guideController.handleDeleteGuide);

	router.post('/api/create-new-tour', tourController.handleCreateNewTour);
	router.get('/api/get-all-tour', tourController.handleGetAllTour);
	router.post('/api/delete-tour', tourController.handleDeleteTour);
	router.put('/api/update-tour', tourController.handleUpdateTour);

	router.get('/api/get-all-activity-type', tourController.handleGetAllActivityType);

	router.post('/api/order-booking-tour', userController.handleOrderBooking);

	return app.use('/', router);
};

module.exports = initWebRoutes;

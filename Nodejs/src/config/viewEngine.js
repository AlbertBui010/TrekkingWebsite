import express from 'express';

let configViewEngine = (app) => {
	app.use(express.static('./src/public')); // static folder stored data (img)
	app.set('view engine', 'ejs'); // jsp
	app.set('views', './src/views');
};

module.exports = configViewEngine;

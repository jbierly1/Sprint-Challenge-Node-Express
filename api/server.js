const express = require('express');

const server = express();

const morgan = require('morgan');

const dbProject = require('../data/helpers/projectModel.js');

const dbAction = require('../data/helpers/actionModel.js');

const projectRoutes = require('./projectRoutes.js');

const actionRoutes = require('./actionRoutes.js');

server.use(express.json());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

module.exports = server;

/////////////////////////

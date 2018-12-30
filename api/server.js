const express = require('express');

const server = express();

const morgan = require('morgan');

const dbProject = require('../data/helpers/projectModel.js');

const dbAction = require('../data/helpers/actionModel.js');

const projectRoutes = require('./projectRoutes.js');

const actionRoutes = require('./actionRoutes.js');

server.use(express.json());
server.use(morgan('dev'));
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

module.exports = server;

/////////////////////////

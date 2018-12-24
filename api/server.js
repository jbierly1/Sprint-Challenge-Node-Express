const express=require('express');

const server=express();

const morgan=require('morgan');

const dbProject = require('../data/helpers/projectModel.js');

const dbAction=require('../data/helpers/actionModel.js');

server.use(express.json());
server.use(morgan('dev'));

module.exports=server;

server.get('/api/projects', (req, res) => {
    dbProject.get()
    .then(projects=>{
        res.status(200).json(projects);
    })		
    .catch(err => {
        res
            .status(500)
            .json({ error: 'The projects information could not be retrieved.' });
    });
})
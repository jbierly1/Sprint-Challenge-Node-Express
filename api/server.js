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

server.get('/api/projects/:id', (req, res) =>{
    let id=req.params.id;
    dbProject.get(id)
    .then(project=>{
        res.status(200).json(project)
    }).catch(err=>{res.status(500).json({error:'The project info is not found'})})
})

server.post('/api/projects', (req, res)=>{
    let newproj=req.body;

    if(newproj.name,newproj.description){

        if(newproj.name.length<=128){
    dbProject.insert(newproj)
    .then(
        project=>{
            res.status(200).json(project);
        }
    ).catch(err=>{res.status(500).json({error:"could not save project"})})

}else{res.status(500).json({error:"name must be less than 128 characters!"})}
}
    else{
        res.status(400).json({error:"please provide name and description"})
    }
})
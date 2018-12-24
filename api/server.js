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

server.put('/api/projects/:id', (req,res)=>{
    let id=req.params.id;
    let changes=req.body;
    console.log(`id ${id}, changes ${changes}`);
    dbProject.update(id,changes)
    .then(updatedProject=>{
        if(updatedProject){
        res.status(200).json({updatedProject})}
        else{res.status(404).json({error:"user with that id could not be updated"})
        }
    }

    )
})

server.delete('/api/projects/:id',(req,res)=>{
    let id=req.params.id;
    dbProject.remove(id).then(numberDeleted=>{
        if(numberDeleted){
        res.status(200).json({success:'successfully removed'})}else{
            res.status(500).json({error:"user cannot be removed"})
        }
    })

})

/////////////////////////

server.get('/api/actions', (req, res) => {
    dbAction.get()
    .then(actions=>{
        res.status(200).json(actions);
    })		
    .catch(err => {
        res
            .status(500)
            .json({ error: 'The actions information could not be retrieved.' });
    });
})

server.get('/api/actions/:id', (req, res) =>{
    let id=req.params.id;
    dbAction.get(id)
    .then(action=>{
        res.status(200).json(action)
    }).catch(err=>{res.status(500).json({error:'The action info is not found'})})
})

server.post('/api/actions', (req, res)=>{
    let newaction=req.body;

    if(newaction.project_id,newaction.description,newaction.notes){

        if(newaction.description.length<=128){
    dbAction.insert(newaction)
    .then(
        action=>{
            console.log("action"+action)
            res.status(200).json(action);
        }
    ).catch(err=>{res.status(500).json({error:"could not save project"})})

}else{res.status(500).json({error:"description must be less than 128 characters!"})}
}
    else{
        res.status(400).json({error:"please provide project id, notes and description"})
    }
})

server.put('/api/actions/:id', (req,res)=>{
    let id=req.params.id;
    let changes=req.body;
    console.log(`id ${id}, changes ${changes}`);
    dbProject.update(id,changes)
    .then(updatedProject=>{
        if(updatedProject){
        res.status(200).json({updatedProject})}
        else{res.status(404).json({error:"user with that id could not be updated"})
        }
    }

    )
})

server.delete('/api/actions/:id',(req,res)=>{
    let id=req.params.id;
    dbProject.remove(id).then(numberDeleted=>{
        if(numberDeleted){
        res.status(200).json({success:'successfully removed'})}else{
            res.status(500).json({error:"user cannot be removed"})
        }
    })

})
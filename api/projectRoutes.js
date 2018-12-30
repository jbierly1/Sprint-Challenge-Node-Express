const express = require('express');
const dbProject = require('../data/helpers/projectModel.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
	dbProject
		.get()
		.then(projects => {
			res.status(200).json(projects);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The projects information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	let id = req.params.id;
	dbProject
		.get(id)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(err => {
			res.status(500).json({ error: 'The project info is not found' });
		});
});

router.post('/', (req, res) => {
	let newproj = req.body;

	if ((newproj.name, newproj.description)) {
		if (newproj.name.length <= 128) {
			dbProject
				.insert(newproj)
				.then(project => {
					res.status(200).json(project);
				})
				.catch(err => {
					res.status(500).json({ error: 'could not save project' });
				});
		} else {
			res.status(500).json({ error: 'name must be less than 128 characters!' });
		}
	} else {
		res.status(400).json({ error: 'please provide name and description' });
	}
});

router.put('/:id', (req, res) => {
	let id = req.params.id;
	let changes = req.body;
	console.log(`id ${id}, changes ${changes}`);
	dbProject.update(id, changes).then(updatedProject => {
		if (updatedProject) {
			res.status(200).json({ updatedProject });
		} else {
			res.status(404).json({ error: 'user with that id could not be updated' });
		}
	});
});

router.delete('/:id', (req, res) => {
	let id = req.params.id;
	dbProject.remove(id).then(numberDeleted => {
		if (numberDeleted) {
			res.status(200).json({ success: 'successfully removed' });
		} else {
			res.status(500).json({ error: 'user cannot be removed' });
		}
	});
});

module.exports = router;

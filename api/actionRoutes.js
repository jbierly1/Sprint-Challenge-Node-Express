const express = require('express');
const dbAction = require('../data/helpers/actionModel.js');

const router = express.Router();
router.use(express.json());
router.get('/', (req, res) => {
	dbAction
		.get()
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(err => {
			res
				.status(500)
				.json({ error: 'The actions information could not be retrieved.' });
		});
});

router.get('/:id', (req, res) => {
	let id = req.params.id;
	dbAction
		.get(id)
		.then(action => {
			res.status(200).json(action);
		})
		.catch(err => {
			res.status(500).json({ error: 'The action info is not found' });
		});
});

router.post('/', (req, res) => {
	let newaction = req.body;

	if ((newaction.project_id, newaction.description, newaction.notes)) {
		if (newaction.description.length <= 128) {
			dbAction
				.insert(newaction)
				.then(action => {
					console.log('action' + action);
					res.status(200).json(action);
				})
				.catch(err => {
					res.status(500).json({ error: 'could not save project' });
				});
		} else {
			res
				.status(500)
				.json({ error: 'description must be less than 128 characters!' });
		}
	} else {
		res
			.status(400)
			.json({ error: 'please provide project id, notes and description' });
	}
});

router.put('/:id', (req, res) => {
	let id = req.params.id;
	let changes = req.body;
	console.log(`id ${id}, changes ${changes}`);
	dbAction.update(id, changes).then(updatedAction => {
		if (updatedAction) {
			res.status(200).json({ updatedAction });
		} else {
			res
				.status(404)
				.json({ error: 'action with that id could not be updated' });
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

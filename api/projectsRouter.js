const express = require('express')
const router = express.Router();

const Projects = require('../data/helpers/projectModel.js');

// GET request
router.get('/', (req, res) => {
  Projects.get(req.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not get projects' });
    })
})

// GET request '/:id/actions
router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then(project => {
      if(project != 0) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'No projects at given index' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not retrieve the projects' });
    })    
})


// POST request
router.post('/', (req, res) => {
  // middleware to check for name and description
  // res.status(401).json({ error: 'Please provide a name and description });

  Projects.insert(req.body)
    .then(project => {
      res.status(201),json(req.body);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not create a new project' });
    }) 
})

const deleteCounter = 0;
// DELETE request
router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      if(project != 0) {
        deleteCounter += 1;
        res.status(200).json({ amountDeleted: deleteCounter });
      } else {
        res.status(404).json({ message: 'Could not find project at given index' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not remove the project' });
    })
})

// PUT request 
router.put('/:id', (req, res) => {
  // middleware to validate update has name and description
  // res.status(400).json({ error: 'Please enter a name and description });

  Projects.update(req.params.id)
    .then(project => {
      if(project != 0) {
        res.status(200).json(req.body);
      } else {
        res.status(404).json({ message: 'Could not find the project at given index' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not update the project' });
    })
})


module.exports = router;
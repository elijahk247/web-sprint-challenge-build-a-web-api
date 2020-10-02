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

// POST request
router.post('/', (req, res) => {
  // middleware to check for name and description
  // res.status(401).json({ error: 'Please provide a name and description });

  Projects.insert(req.body)
    .then(project => {
      res.status(201),json({ message: 'Created a new project' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not create a new project' });
    }) 
})

// DELETE request
router.delete('/:id', (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      if(project != 0) {
        res.status(200).json({ message: 'Successfully removed' });
      } else {
        res.status(404).json({ message: 'Could not find project at given index' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not remove the project' });
    })
})


module.exports = router;
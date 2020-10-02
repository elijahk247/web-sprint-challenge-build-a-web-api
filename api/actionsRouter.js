const express = require('express')
const router = express.Router();

const Actions = require('../data/helpers/actionModel');

// GET request
router.get('/', (req ,res) => {
  Actions.get(req.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving action' });
    })
})

// // GET request by id
// router.get('/:id', (req ,res) => {
//   Actions.get(req.id)
//     .then(action => {
//       if(action != 0) {
//         res.status(200).json(action);
//       } else {
//         res.status(404).json({ message: 'Action at given index does not exist' });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: 'Error retrieving action' });
//     })
// })

function validateRequest(req, res, next) {
  if(req.body.project_id && req.body.description && req.body.notes) {
    next();
  } else {
    res.status(401).json({ error: 'Please fill out the project_id, description, and notes of the action' });
  }
}

// POST request -- use 4 when running tests
router.post('/', validateRequest, (req, res) => {
  // if(!req.body.description) {
  //   res.status(401).json({ error: 'Please fill out the description of the action' });
  // }    

  // middleware to check if req.body has a description to move on to the post 

  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not create the action' });
    })
})

const deleteCounter = 0;
// DELETE request
router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      if(action !=0) {
        deleteCounter += 1;
        res.status(200).json({ amountRemoved: deleteCounter });
      } else {
        res.status(404).json( {message: 'Action at given index does not exist' });
      }
    })
    .catch(err  => {
      res.status(500).json({ error: 'Could not remove the action' });
    })
})

//PUT request
router.put('/:id', validateRequest, (req, res) => {
  // middleware to determine if valid update 

  Actions.update(req.params.id, req.body)
    .then(action => {
      if(action != 0) {
        res.status(200).json(req.body);
      } else {
        res.status(404).json({ message: 'Could not find action at given index' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not update the action' });
    })
})

module.exports = router;
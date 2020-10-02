const express = require('express')
const router = express.Router();

const Actions = require('../data/helpers/actionModel');

router.get('/:id', (req ,res) => {
  Actions.get(req.params.id)
    .then(action => {
      if(action != 0) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Action at given index does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error retrieving action' });
    })
})

module.exports = router;
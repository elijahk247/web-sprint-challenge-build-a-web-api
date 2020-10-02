const express = require('express');
const server = express();

server.use(express.json());

// separate files for CRUD operations on these db helpers 
const actionsRouter = require('./actionsRouter.js');
const projectsRouter = require('./projectsRouter.js');

// endpoints
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// landing 
server.get('/', (req, res) => {
  res.status(200).json({ message: 'sprint project' });
})

module.exports = server;
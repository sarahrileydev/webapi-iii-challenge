const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')


const userRouter = require('./data/userRouter');
const postRouter = require('./data/postRouter');


const server = express();

server.use(helmet());
server.use(morgan('short'))
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);


server.get('/', async (req, res) => {
    res.send(`
      <h2>Posts</h2>
    `);
  });



module.exports = server;
/* eslint-disable no-restricted-globals */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('./../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

blogsRouter.get('', async (request, response) => {
  const results = await Blog.find({});

  response.json(results);
  return;
});

blogsRouter.post('', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const decodedToken = jwt.verify(request.token, config.SECRET);
    User.find({ id: decodedToken.id })
      .then((user) => {
        const max = 1000000000;
        const id = Math.floor(Math.random() * max);
        console.log(user);
        blog.id = id;
        blog.author = user.name;

        if (typeof blog.likes === 'undefined') {
          blog.likes = 0;
        }

        if (typeof blog.title === 'undefined' && typeof blog.url === 'undefined') {
          response.status(400).send();
          return;
        }

        //blog.save();
        response.status(201).send();
      });

  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  if (isNaN(request.params.id)) {
    response.status(400).send({ message: 'Annettavan ID:n pitää olla numero.' });
    return;
  }

  const id = Number(request.params.id);

  const foundBlog = await Blog.find({ id });

  if (foundBlog.length === 0) {
    response.status(404).send({ message: 'Poistettavaa blogia ei löydetty.' });
    return;
  }

  await Blog.deleteOne({ id });
  response.status(200).send();
  return;
});

blogsRouter.put('/:id', async (request, response) => {
  if (isNaN(request.params.id)) {
    response.status(400).send({ message: 'Annettavan ID:n pitää olla numero.' });
    return;
  }

  const id = Number(request.params.id);

  const foundBlog = await Blog.find({ id });

  if (foundBlog.length === 0) {
    response.status(404).send({ message: 'Muokattavaa blogia ei löydetty.' });
    return;
  }

  const blogData = request.body;
  const result = await Blog
    .findOneAndUpdate({ id }, blogData, { new: true });

  response.status(200).send(result.toJSON());
  return;
});

module.exports = blogsRouter;

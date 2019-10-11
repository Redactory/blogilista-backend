/* eslint-disable no-restricted-globals */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('./../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('', async (request, response) => {
  const results = await Blog.find({});

  return response.json(results);
});

blogsRouter.post('', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const token = getTokenFrom(request);

    if (token === null) {
      throw { type: 'missing', kind: 'token', message: 'No token sent' };
    }

    const decodedToken = jwt.verify(token, config.SECRET);

    const user = await User.findOne({ id: decodedToken.id });
    const max = 1000000000;
    const id = Math.floor(Math.random() * max);
    blog.id = id;
    blog.author = user.name;

    if (typeof blog.likes === 'undefined') {
      blog.likes = 0;
    }

    if (typeof blog.title === 'undefined' && typeof blog.url === 'undefined') {
      return response.status(400).send();
    }

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  if (isNaN(request.params.id)) {
    return response.status(400).send({ message: 'Annettavan ID:n pitää olla numero.' });
  }

  const id = Number(request.params.id);

  const foundBlog = await Blog.find({ id });

  if (foundBlog.length === 0) {
    return response.status(404).send({ message: 'Poistettavaa blogia ei löydetty.' });
  }

  await Blog.deleteOne({ id });
  return response.status(200).send();
});

blogsRouter.put('/:id', async (request, response) => {
  if (isNaN(request.params.id)) {
    return response.status(400).send({ message: 'Annettavan ID:n pitää olla numero.' });
  }

  const id = Number(request.params.id);

  const foundBlog = await Blog.find({ id });

  if (foundBlog.length === 0) {
    return response.status(404).send({ message: 'Muokattavaa blogia ei löydetty.' });
  }

  const blogData = request.body;
  const result = await Blog
    .findOneAndUpdate({ id }, blogData, { new: true });

  return response.status(200).send(result.toJSON());
});

module.exports = blogsRouter;

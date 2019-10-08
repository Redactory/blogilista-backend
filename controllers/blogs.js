const blogsRouter = require('express').Router();
const Blog = require('./../models/blog');

blogsRouter.get('', async (request, response) => {
  const results = await Blog.find({});

  return response.json(results);
});

blogsRouter.post('', async (request, response) => {
  const blog = new Blog(request.body);

  const max = 1000000000;
  const id = Math.floor(Math.random() * max);
  blog.id = id;

  if (typeof blog.likes === 'undefined') {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;

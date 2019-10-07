/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Test_1',
    author: 'Jonathan Who',
    url: 'www.hs.fi',
  },
  {
    title: 'Test_2',
    author: 'Jonathan Swein',
    url: 'www.hs.fi',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blockObject = new Blog(initialBlogs[0]);
  await blockObject.save();

  blockObject = new Blog(initialBlogs[1]);
  await blockObject.save();
});


test('get all blogs', async (done) => {
  const response = await api
    .get('/api/blogs');

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);

  done();
});

afterAll(async () => {
  mongoose.connection.close();
});

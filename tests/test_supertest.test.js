/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    id: 1,
    title: 'Test_1',
    author: 'Jonathan Who',
    url: 'www.hs.fi',
  },
  {
    id: 2,
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

describe('async/await harjoittelua', () => {
  test('get all blogs', async (done) => {
    const response = await api
      .get('/api/blogs');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);

    done();
  });

  test('check identifying field name and existence', async (done) => {
    const response = await api
      .get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
    expect(response.body[1].id).toBeDefined();

    done();
  });
});

afterAll(async () => {
  mongoose.connection.close();
});

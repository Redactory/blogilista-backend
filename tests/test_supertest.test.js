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
    likes: 1,
  },
  {
    id: 2,
    title: 'Test_2',
    author: 'Jonathan Swein',
    url: 'www.hs.fi',
    likes: 3,
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

  test('Test adding new blog to the system', async (done) => {
    let response = await api
      .get('/api/blogs');

    let blogCount = response.body.length;

    expect(blogCount).toBe(2);

    let newBlog = {
      title: 'Uusi blogi',
      author: 'Sari Suominen',
      url: 'www.jest.fi',
    };

    await api
      .post('/api/blogs', newBlog)
      .send(newBlog);

    response = await api
      .get('/api/blogs');

    blogCount = response.body.length;
    const createdBlog = response.body[2];

    expect(blogCount).toBe(3);
    expect(createdBlog.title).toEqual('Uusi blogi');
    expect(createdBlog.author).toEqual('Sari Suominen');
    expect(createdBlog.url).toEqual('www.jest.fi');

    done();
  });

  test('Check likes field initialisation', async (done) => {
    const newBlog = {
      title: 'Uusi blogi',
      author: 'Sari Suominen',
      url: 'www.jest.fi',
    };

    const response = await api
      .post('/api/blogs', newBlog)
      .send(newBlog);

    expect(response.body.likes).toBe(0);
    done();
  });

  test('Return status 400 if title- and url - fields are missing', async (done) => {
    const newBlog = {
      author: 'Sari Suominen',
      likes: 5,
    };

    const response = await api
      .post('/api/blogs', newBlog)
      .send(newBlog);

    expect(response.status).toBe(400);
    done();
  });

  test('delete single blog from blog database with appropriate ID', async (done) => {
    const id = 1;
    let response = await api
      .get('/api/blogs');

    let blogCount = response.body.length;

    expect(blogCount).toBe(2);

    await api
      .delete(`/api/blogs/${id}`);

    response = await api
      .get('/api/blogs');

    blogCount = response.body.length;

    expect(blogCount).toBe(1);

    const remainingBlog = response.body[0];
    expect(remainingBlog.title).toEqual('Test_2');
    expect(remainingBlog.author).toEqual('Jonathan Swein');

    done();
  });

  test('try to delete blog with invalid ID input', async (done) => {
    const id = '1a';

    const response = await api
      .delete(`/api/blogs/${id}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Annettavan ID:n pitää olla numero.');
    done();
  });

  test('try to delete blog with non-existent ID input', async (done) => {
    const id = 4;

    const response = await api
      .delete(`/api/blogs/${id}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Poistettavaa blogia ei löydetty.');
    done();
  });
});

afterAll(async () => {
  mongoose.connection.close();
});

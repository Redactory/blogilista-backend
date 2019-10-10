/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Test user creation', () => {

  test('check that user is created with appropriate input values', async (done) => {
    const newUserData = {
      username: 'JSwift',
      name: 'Jonathan Swift',
      password: 'insecure',
    };

    let response = await api.get('/api/users');
    expect(response.body.length).toBe(0);

    response = await api.post('/api/users').send(newUserData);
    expect(response.status).toBe(201);
    expect(response.text).toEqual('Käyttäjä luotu');

    response = await api.get('/api/users');
    expect(response.body.length).toBe(1);
    expect(response.body[0].username).toEqual('JSwift');

    done();
  });

  test('check that user is not created too short username', async (done) => {
    const newUserData = {
      username: 'JS',
      name: 'Jonathan Swift',
      password: 'insecure',
    };

    const response = await api.post('/api/users', newUserData).send(newUserData);
    expect(response.error.status).toBe(400);
    expect(response.body.message).toEqual(`Annettu käyttäjätunnus ${newUserData.username} on liian lyhyt (minimi on 3 merkkiä)`);

    done();
  });

  test('check that user duplicate username is not created', async (done) => {
    const newUserData_1 = {
      username: 'JSwift',
      name: 'Jonathan Swift',
      password: 'insecure',
    };

    const newUserData_2 = {
      username: 'JSwift',
      name: 'Jonathan Swift',
      password: 'insecure',
    };

    let response = await api.post('/api/users').send(newUserData_1);
    expect(response.status).toBe(201);
    expect(response.text).toEqual('Käyttäjä luotu');

    response = await api.post('/api/users').send(newUserData_2);
    expect(response.error.status).toBe(400);
    expect(response.body.message).toEqual(`Käyttäjä ${newUserData_2.username} on jo olemassa järjestelmässä.`);

    done();
  });

  test('check that user is not created too short password', async (done) => {
    const newUserData = {
      username: 'JSwift',
      name: 'Jonathan Swift',
      password: 'in',
    };

    const response = await api.post('/api/users').send(newUserData);
    expect(response.error.status).toBe(400);
    expect(response.body.message).toEqual(`Annettu salasana ${newUserData.password} on liian lyhyt (minimi on 3 merkkiä)`);

    done();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('./../models/user');

usersRouter.post('', async (request, response, next) => {
  try {
    const max = 1000000000;
    const id = Math.floor(Math.random() * max);

    const userData = request.body;
    const saltRounds = 10;

    if (userData.password.length < 3) {
      throw { type: 'password', kind: 'tooshort', value: userData.password };
    }

    const passwordHash = await bcrypt.hash(userData.password, saltRounds);

    const newUser = new User({
      username: userData.username,
      name: userData.name,
      passwordHash,
      id,
    });

    const errors = newUser.validateSync();
    if (typeof errors !== 'undefined') {
      throw errors;
    }

    await newUser.save();

    response.status(201).send('Käyttäjä luotu');
  } catch (error) {
    next(error);
  }
});

usersRouter.get('', async (request, response) => {
  const results = await User.find({});
  response.status(200).send(results);
});

module.exports = usersRouter;

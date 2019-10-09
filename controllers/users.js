const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('./../models/user');

usersRouter.post('', async (request, response) => {
  const max = 1000000000;
  const id = Math.floor(Math.random() * max);

  const userData = request.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRounds);

  const newUser = new User({
    username: userData.username,
    name: userData.name,
    passwordHash,
    id,
  });

  await newUser.save();

  response.status(201).send('Käyttäjä luotu');
});

usersRouter.get('', async (request, response) => {
    const results = await User.find({});
    response.status(200).send(results);
});

module.exports = usersRouter;

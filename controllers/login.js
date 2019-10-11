const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('', async (request, response, next) => {
  const body = request.body;

  try {
    const user = await User.findOne({ username: body.username });

    if (user === null) {
      throw { type: 'notFound', kind: 'user', message: 'Käyttäjää ei löydetty tietokannasta' };
    }

    const correctPassword = await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && correctPassword)) {
      throw { type: 'notFound', kind: 'password', message: 'Salasana on väärä' };
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, config.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;

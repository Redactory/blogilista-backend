const userAddingErrorHandling = (error, request, response, next) => {
  if (error.type === 'notFound' && error.kind === 'user') {
    return response.status(401).json({ message: error.message });
  }

  if (error.type === 'notFound' && error.kind === 'password') {
    return response.status(401).json({ message: error.message });
  }

  if (error.type === 'password' && error.kind === 'tooshort') {
    return response.status(400).json({ message: `Annettu salasana ${error.value} on liian lyhyt (minimi on 3 merkkiä)` });
  }

  if (error.errors.username.name === 'ValidatorError'
      && error.errors.username.kind === 'unique') {
    return response.status(400).json({ message: `Käyttäjä ${error.errors.username.value} on jo olemassa järjestelmässä.` });
  }

  if (error.errors.username.name === 'ValidatorError'
      && error.errors.username.kind === 'minlength') {
    return response.status(400).json({ message: `Annettu käyttäjätunnus ${error.errors.username.value} on liian lyhyt (minimi on 3 merkkiä)` });
  }

  next(error);
};

module.exports = {
  userAddingErrorHandling,
};

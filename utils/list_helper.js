/* eslint-disable arrow-body-style */
const reducer = (total, addition) => {
  return { likes: total.likes + addition.likes };
};

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const result = blogs.reduce((total, addition) => reducer(total, addition), { likes: 0 });
  return result.likes;
};

module.exports = {
  dummy,
  totalLikes,
};

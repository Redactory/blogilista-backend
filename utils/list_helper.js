/* eslint-disable no-plusplus */
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

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  let likes = -1;
  let mostLikedBlog = {};
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > likes) {
      likes = blogs[i].likes;
      mostLikedBlog = blogs[i];
    }
  }

  const returnData = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };

  return returnData;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
};

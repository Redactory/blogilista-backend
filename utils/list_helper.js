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

const mostBlogs = (blogs) => {
  const bloggers = new Map();
  const mostProlificAuthor = {
    author: '',
    blogs: -1,
  };

  for (let i = 0; i < blogs.length; i++) {
    const value = bloggers.get(blogs[i].author);
    if (typeof value === 'undefined') {
      bloggers.set(blogs[i].author, 1);
      if (mostProlificAuthor.blogs < 1) {
        mostProlificAuthor.blogs = 1;
        mostProlificAuthor.author = blogs[i].author;
      }
    } else {
      const authorBlogsCount = value + 1;
      bloggers.set(blogs[i].author, authorBlogsCount);

      if (authorBlogsCount > mostProlificAuthor.blogs) {
        mostProlificAuthor.blogs = authorBlogsCount;
        mostProlificAuthor.author = blogs[i].author;
      }
    }
  }

  return mostProlificAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
};

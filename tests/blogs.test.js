/* eslint-disable no-undef */
const Blogs = require('./test_data');
const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('number of likes', () => {
  test('when list has serveral blogs', () => {
    const result = listHelper.totalLikes(Blogs.allBlogs);
    expect(result).toBe(36);
  });

  test('when list has no blogs', () => {
    const result = listHelper.totalLikes(Blogs.emptyBlogList);
    expect(result).toBe(0);
  });

  test('when list has one blog', () => {
    const result = listHelper.totalLikes(Blogs.oneBlogList);
    expect(result).toBe(7);
  });
});

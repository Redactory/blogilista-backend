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

describe('favoriteBlog', () => {
  test('there one most liked blog', () => {
    const shouldBe = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    const result = listHelper.favoriteBlog(Blogs.allBlogs);
    expect(result).toEqual(shouldBe);
  });

  test('there is more than one most liked blogs', () => {
    const shouldBe = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 12,
    };

    const result = listHelper.favoriteBlog(Blogs.listWithTwoMostLiked);
    expect(result).toEqual(shouldBe);
  });

  test('blog list is empty', () => {
    const shouldBe = {};

    const result = listHelper.favoriteBlog(Blogs.emptyBlogList);
    expect(result).toEqual(shouldBe);
  });

  test('one blog list', () => {
    const shouldBe = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    };

    const result = listHelper.favoriteBlog(Blogs.oneBlogList);
    expect(result).toEqual(shouldBe);
  });
});

describe('most blogs', () => {
  test('test with list of many blogs,', () => {
    const shouldBe = {
      author: "Robert C. Martin",
      blogs: 3,
    };

    const result = listHelper.mostBlogs(Blogs.allBlogs);
    expect(result).toEqual(shouldBe);
  });

  test('test with list of two most blogged', () => {
    const shouldBe = {
      author: "Teemu Matvejeff",
      blogs: 2,
    };

    const result = listHelper.mostBlogs(Blogs.listWithTwoMostBlogged);
    expect(result).toEqual(shouldBe);
  });

  test('test with one element list', () => {
    const shouldBe = {
      author: "Michael Chan",
      blogs: 1,
    };

    const result = listHelper.mostBlogs(Blogs.oneBlogList);
    expect(result).toEqual(shouldBe);
  });

  test('test with empty list', () => {
    const shouldBe = {
      author: '',
      blogs: -1,
    };

    const result = listHelper.mostBlogs(Blogs.emptyBlogList);
    expect(result).toEqual(shouldBe);
  });
});

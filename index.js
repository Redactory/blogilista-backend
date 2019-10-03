const http = require('http');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const server = http.createServer(app);
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs')

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

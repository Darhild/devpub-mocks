const express = require('express');
const path = require('path');
const post = require('./post.json');
const tag = require('./tag.json');
const app = express();
const { PORT } = require('./env');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get('/api/post', (req, res) => {
    res.send(post);
});

app.get('/api/tag', (req, res) => {
  res.send(tag);
})

app.listen(process.env.PORT || PORT);
console.log(`Server listens on Port ${PORT}`)

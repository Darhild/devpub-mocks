const express = require('express');
const path = require('path');
const post = require('./post.json');
const calendar = require('./calendar.json');
const byDate = require('./byDate.json');
const tag = require('./tag.json');
const moderated = require('./moderated.json');
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

app.get('/api/post/byDate', (req, res) => {
  res.send(byDate);
});

app.get('/api/calendar', (req, res) => {
  res.send(calendar);
});

app.get('/api/post/moderation', (req, res) => {
  res.send(moderated);
});

app.get('/api/tag', (req, res) => {
  res.send(tag);
})

app.listen(process.env.PORT || PORT);
console.log(`Server listens on Port ${PORT}`)

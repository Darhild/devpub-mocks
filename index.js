const express = require('express');
const path = require('path');
const post = require('./post.json');
const calendar = require('./calendar.json');
const byDate = require('./byDate.json');
const tag = require('./tag.json');
const user = require('./testUser.json');
const moderated = require('./moderated.json');
const app = express();
const { PORT } = require('./env');

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain);

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get('/api/post', (req, res) => {
    res.send(post);
})

app.get('/api/post/search', (req, res) => {
  res.send(post);
})

app.get('/api/post/byTag', (req, res) => {
  res.send(post);
})

app.get('/api/post/byDate', (req, res) => {
  res.send(byDate);
})

app.get('/api/calendar', (req, res) => {
  res.send(calendar);
})

app.get('/api/post/my', (req, res) => {
  res.send(moderated);
})

app.get('/api/post/moderation', (req, res) => {
  res.send(moderated);
})

app.get('/api/statistics/my', (req, res) => {
  res.send({
    "postsCount": 7,
    "likesCount": 15,
    "dislikesCount": 2,
    "viewsCount": 58,
    "firstPublication": "2018-07-16 17:35"
  });
})

app.get('/api/statistics/all', (req, res) => {
  res.send({
    "postsCount": 514,
    "likesCount": 8560,
    "dislikesCount": 920,
    "viewsCount": 11635,
    "firstPublication": "2018-01-01 10:20"
  });
})

app.get('/api/tag', (req, res) => {
  res.send(tag);
})

app.get('/api/auth/logout', (req, res) => {
  res.send({ result: true })
})

app.post('/api/comment', (req, res) => {
  res.send({ id: 388 })
})

app.post('/api/auth/login', (req, res) => {
  res.send({
    "result": true,
    "user": user
  });
})

app.post('/api/auth/restore', (req, res) => {
  const num = Math.round(Math.random());
  res.send({ result: Boolean(num) })
})

app.post('/api/post/like', (req, res) => {
  res.send({ result: true })
})

app.post('/api/post/dislike', (req, res) => {
  res.send({ result: true })
})

app.post('/api/auth/password', (req, res) => {
  const result = Math.round(Math.random());

  if(result) {
    res.send({ result })
  } else res.send({
    "result": false,
    "errors": {
      "code": "Ссылка для восстановления пароля устарела. <a href='login/resstore'>Запросить ссылкеу снова.</a>",
      "captcha": "Пароль короче шести символов"
    }
  })
})

app.post('/api/auth/register', (req, res) => {
  const result = Math.round(Math.random());

  if(result) {
    res.send({ result })
  } else res.send({
    "result": false,
    "errors": {
      "email": "Этот email уже зарегистрирован",
      "captcha": "Пароль короче шести символов"
    }
  })
})

app.post('/api/profile/my', (req, res) => {
  const result = Math.round(Math.random());

  if(result) {
    res.send({ result })
  } else res.send({
    "result": false,
    "errors": {
      "email": "Этот email уже зарегистрирован",
      "photo": "Фото слишком большое, нужно не более 5 Мб"
    }
  })
})

app.post('/api/post', (req, res) => {
  res.send({ result: true })
})

app.put('/api/settings', (req, res) => {
  res.send({ result: true })
})

app.put('/api/post/:id', (req, res) => {
  res.send({ result: true })
})

app.listen(process.env.PORT || PORT);
console.log(`Server listens on Port ${PORT}`)

const express = require('express');
const path = require('path');
const post = require('./post.json');
const singlePost = require('./singlePost.json');
const calendar = require('./calendar.json');
const byDate = require('./byDate.json');
const tag = require('./tag.json');
const user = require('./testUser.json');
const moderated = require('./moderated.json');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = require('./env');

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "1000000000");
  next();
}

app.use(allowCrossDomain);

app.use(fileUpload({
  createParentPath: true
}));

app.use(bodyParser.urlencoded({extended: true}));
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

app.get('/api/post/:id', (req, res) => {
  res.send(singlePost);
}),

app.get('/api/auth/captcha', (req, res) => {
  res.send({
    "secret": "car4y8cryaw84cr89awnrc",
    "image": "data:image/png;base64,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"
  });
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

app.get('/api/settings', (req, res) => {
  res.send({
    "MULTIUSER_MODE": true,
    "POST_PREMODERATION": false,
    "STATISTICS_IS_PUBLIC": true
  })
})

app.post('/api/comment', (req, res) => {
  res.send({ id: 388 })
})

app.get('/api/auth/check', (req, res) => {
  res.send({
    "result": true,
    "user": user
  });
})

app.post('/api/auth/login', (req, res) => {
  res.send({
    "result": true,
    "user": user
  });
})

app.post('/api/images', (req, res) => {
  res.send("\/static\/default-1.png");
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
      "code": "Ссылка для восстановления пароля устарела. <a href='/login/restore-password'>Запросить ссылку снова.</a>",
      "captcha": "Код с картинки введен неверно"
    }
  })
})

app.post('/api/auth/register', (req, res) => {
  const result = Math.round(Math.random());

  if(result) {
    res.send({ result: true })
  } else res.send({
    "result": false,
    "errors": {
      "email": "Этот email уже зарегистрирован",
      "captcha": "Код с картинки введет неверно"
    }
  })
})

app.post('/api/profile/my', (req, res) => {
  res.send({ result: true })
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

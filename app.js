const express = require('express');
const app = express();
const path = require('path');

const db = require('./models');
const { User, Thing } = db.models;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [ Thing ]
    });
    res.send(users);
  }
  catch (err) { next(err) }
})

const PORT = process.env.PORT || 3000;
const init = async () => {
  await db.sync();
  await db.seed();
  app.listen(PORT, console.log(`Listening on port: ${PORT}`));
}
init();

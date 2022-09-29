const express = require('express');
const app = express();
const { errorHandler } = require('./middleware/error')
const path = require('path')

const usersController = require('./controllers/userController');
const todosController = require('./controllers/todosController');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/api/users', usersController);
app.use('/api/todos', todosController);

if(process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  })
}
else {
  app.get('/', (req, res) => res.send('Please set to production'))
}


app.use(errorHandler);

module.exports = app;
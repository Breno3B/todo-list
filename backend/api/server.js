const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { todoRouter } = require('../controllers/todoController');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}; 

// Source: https://remotestack.io/how-to-build-react-mern-stack-todo-crud-application/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, OPTIONS)
  .then(() => {
    console.log('Database connected!');
  },
  error => {
    console.log(error);
  }
  );

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', todoRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

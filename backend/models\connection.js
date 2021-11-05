const mongoose = require('mongoose');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}; 

let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : mongoose.connect(process.env.MONGO_DB_URL, OPTIONS)
    .then(() => {
      console.log('Database connected!');
    },
    error => {
      console.log('Erro na conexão com a base de dados');
      console.log(error);
    }
    )
);

module.exports = { connection };
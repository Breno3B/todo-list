const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3013;

const app = express();

// app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());

app.use('/api', todoRoute);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

module.exports = app;

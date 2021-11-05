const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoModel = new Schema({
  description: {
    type: String
  },
  status: {
    type: String,
    default: 'pendente'
  },
},
{ collection: 'todos' }
);

todoModel.set('timestamps', {
  createdAt: true
});

module.exports = mongoose.model('Todo', todoModel);

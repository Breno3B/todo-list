const express = require('express');
const todoModel = require('../models/todoModel');

const todoRouter = express.Router();

todoRouter.get('/', (req, res, next) => {
  todoModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      return res.status(200).json(data);
    }
  });
});

todoRouter.post('/create-todo', (req, res, next) => {
  todoModel.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      return res.status(201).json(data);
    }
  });
});

todoRouter.get('/edit-todo/:id', (req, res, next) => {
  todoModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      return res.status(200).json(data);
    }
  });
});

todoRouter.put('/update-todo/:id', (req, res, next) => {
  todoModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log('Todo updated');
      return res.status(200).json(data);
    }
  });
});

todoRouter.delete('/delete-todo/:id', (req, res, next) => {
  todoModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      return res.status(204).json({ msg: data });
    }
  });
});

module.exports = { todoRouter };
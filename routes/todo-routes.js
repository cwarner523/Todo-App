const express = require('express');
const listRoutes = express.Router();

const listController = require('../controllers/todos-controller');

listRoutes.get('/', listController.index);
listRoutes.post('/', listController.create);

listRoutes.get('/add', (req, res) => {
    res.render('todos/todo-add', {
        currentPage: 'add',
    });
});

listRoutes.get('/edit', (req, res) => {
    res.render('todos/todo-single-edit', {
        currentPage: 'edit',
    });
});


listRoutes.get('/:id', listController.show);
listRoutes.get('/:id/edit', listController.edit);
listRoutes.put('/:id', listController.update);
listRoutes.delete('/:id', listController.delete);

module.exports = listRoutes;
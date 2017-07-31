const List = require('../models/todos');
const listController = {};

listController.index = (req, res) => {
    List.findAll().then(toDos => {
        res.render('todos/todo-index', {
            currentPage: 'index',
            message: 'ok',
            data: toDos,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
};

listController.show = (req, res) => {
    List.findById(req.params.id)
    .then(toDo => {
        res.render('todos/todo-single', {
            currentPage: 'show',
            message: 'ok',
            data: toDo,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

listController.create = (req, res) => {
    List.create({
        title: req.body.title,
        category: req.body.category,
        status: req.body.status,
        description: req.body.description,
    }).then(() => {
        res.redirect('/todos');
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

listController.update = (req, res) => {
    List.update({
        title: req.body.title,
        category: req.body.category,
        status: req.body.status,
        description: req.body.description, 
    }, req.params.id).then(toDo => {
        res.redirect(`/todos/${req.params.id}`);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

listController.edit = (req, res) => {
    List.findById(req.params.id)
    .then(toDo => {
        res.render(`/todos/todo-single-edit`, {
            currentPage: 'edit',
            data: toDo,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
};

listController.delete = (req, res) => {
    List.destroy(req.params.id)
    .then(() => {
        res.redirect('/todos');
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
}

module.exports = listController;
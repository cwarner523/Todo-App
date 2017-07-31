const db = require('../db/config');
const List = {};

List.findAll = () => {
    return db.query('SELECT * FROM toDos');
}

List.findById = (id) => {
    return db.oneOrNone(`
    SELECT * FROM toDos
    WHERE id = $1
    `, [id]);
}

List.create = (toDo) => {
    return db.one(`
    INSERT INTO toDos (
        title, 
        category, 
        status, 
        description
    ) VALUES (
        $1, 
        $2,
        $3,
        $4
    )RETURNING *`, 
    [toDo.title, toDo.category, toDo.status, toDo.description]);
}

List.update = (toDo, id) => {
    return db.one(`
    UPDATE toDos SET
    title = $1,
    category = $2,
    status = $3,
    description = $4
    WHERE id = $5
    RETURNING *
    `, [toDo.title, toDo.category, toDo.status, toDo.description, id])
}

List.destroy = (id) => {
    return db.none(`
    DELETE FROM toDos
    WHERE id = $1
    `, [id]);
}

module.exports = List;
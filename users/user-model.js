const db = require('../data/db.config.js');


module.exports = {

    add, 
    find, 
    findById,
    findBy,  

}

function find() {
    return db('user').select('id', 'uname', 'pass');
}

function add(user){
    return db('user')
    .insert(user)
    .then(ids => { 
        const [id] = ids; 
        return findById(id); 
    })
}

function findById(id){
    return db('user')
    // .select('id', 'uname', 'pass')
    .where({id})
    .first();
}
function findBy(filter){
    return db('user')
    .where(filter);
}
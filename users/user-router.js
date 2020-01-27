const bcrypt = require('bcrypt');
const router = require('express').Router(); 

const User = require('../users/user-model.js');


router.get('/users', (req, res) => { 
    User.find()
    .then(user => { 
        res.status(200).json(user); 
    })
    .catch(err => { 
        res.status(500).json({error:'get request failed'})
    })
})

module.exports = router; 
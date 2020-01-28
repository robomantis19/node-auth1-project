const bcrypt = require('bcryptjs'); 

const router = require('express').Router(); 

const Users = require('../users/user-model.js');


router.post('/login', (req, res) => { 
    let {username, password} = req.body; 

    Users.findBy({username})

    .first()
    .then(user => { 
        console.log('user',user);
        if ( user && bcrypt.compareSync(password, user.password)){
            //$2b$08$xnYRWMufB5vp3ZATwGzTlO8Hx6/FLV1tbssmoJUG3hLp6Kvc61t82
            res.status(200).json({message: `Welcome: ${user.username} is logged in!`})
        }else{
            res.status(401).json({message:'You shall not pass!'})
        }
    
    })
    .catch(err => {
        console.log('login err:', err);
    })
})

module.exports = router; 
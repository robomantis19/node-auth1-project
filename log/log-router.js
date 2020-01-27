const bcrypt = require('bcryptjs'); 

const router = require('express').Router(); 

const Users = require('../users/user-model.js');


router.post('/login', (req, res) => { 
    let {uname, pass} = req.body; 

    Users.findBy({uname})

    .first()
    .then(user => { 
        console.log('user',user);
        if ( user && bcrypt.compareSync(pass, user.pass)){
            //$2b$08$xnYRWMufB5vp3ZATwGzTlO8Hx6/FLV1tbssmoJUG3hLp6Kvc61t82
            res.status(200).json({message: `Welcome: ${user.uname} its a new day!`})
        }else{
            res.status(401).json({message:'Invalid credentials.'})
        }
    
    })
    .catch(err => {
        console.log('login err:', err);
    })
})

module.exports = router; 
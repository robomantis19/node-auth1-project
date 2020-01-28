const router = require('express').Router();

const User = require('../users/user-model.js');
const bcrypt = require('bcryptjs'); 

router.post('/register', (req, res) => { 
    // let { uname, pass } = req.body;
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8); 
    user.password = hash;
    //console.log(user.pass);
    // console.log('uname pass', uname, pass)

    User.add(user)
    .then(inp => { 
        console.log(inp);
        res.status(201).json(inp); 
    })
    .catch(err => { 
        console.log('error reg: ', err)
        res.status(500).json({error: "registration did not work. ", error: err})
    })
})


module.exports = router
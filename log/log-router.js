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
            console.log('user id', user.id);
            req.session.loggedIn = true; 
            req.session.userId = user.id;
            res.status(200).json({message: `Welcome: ${user.username} is logged in! with password ${user.password}`})
        }else{
            res.status(401).json({message:'You shall not pass!'})
        }
    
    })
    .catch(err => {
        console.log('login err:', err);
    })
})
// router.get('/all', (req,res) => { 
//     if(req.session){
        
//         req.session.all((error, sessions)=> { 
//             if(error){
//                 res.status(500).json({
//                     you: 'Once in Haros den, always in haros den!'
//                 })
//             }
//             else{
//                 res.status(200).json({ONline: sessions})
//             }
//         })

       
        
//     }
// })
router.get('/logout', (req, res) => { 
    if(req.session){
       
        req.session.destroy(err => { 
            if(err){
                res.status(500).json({
                    you: 'Once in Haros den, always in haros den!'
                })
            }
            else{
                res.status(200).json({bye: 'thanks for logging out'})
            }
        })
    }else{
        res.status(204)
    }
})
module.exports = router; 
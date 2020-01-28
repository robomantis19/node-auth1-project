const router = require('express').Router();

const regRouter = require('./reg/reg-router.js'); 
const logRouter = require('./log/log-router.js'); 
const userRouter = require('./users/user-router.js')
router.use('/reg', regRouter);
router.use('/log', logRouter); 
router.use('/usr', userRouter); 

router.get('/', (req, res) => { 
    res.json({api: "Server started"}); 
})
module.exports = router; 
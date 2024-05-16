const express = require("express") 
const router =  express.Router()

const passport = require ("../passport/passport")

router.get('/', (req, res)=> {
    
    return res.status(200).send('hello guy')
})

module.exports = router
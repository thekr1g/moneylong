const Router = require('express')
const checkController = require('../controllers/checkController')
const router = new Router

router.post('/',checkController.create)

module.exports = router
const Router = require('express')
const accountController = require('../controllers/accountController')
const router = new Router

router.post('/',accountController.create)
router.get('/', accountController.getAll)
router.put('/', accountController.update)

module.exports = router
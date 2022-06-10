const Router = require('express')
const accountTypeController = require('../controllers/accountTypeController')
const router = new Router

router.post('/',accountTypeController.create)
router.get('/', accountTypeController.getAll)

module.exports = router
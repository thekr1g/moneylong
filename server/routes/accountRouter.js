const Router = require('express')
const accountController = require('../controllers/accountController')
const router = new Router

router.post('/',accountController.create)
router.get('/', accountController.getAll)
router.put('/', accountController.update)
router.delete('/', accountController.delete)
router.get('/:id', accountController.getOne)

module.exports = router
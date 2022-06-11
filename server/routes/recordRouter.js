const Router = require('express')
const recordController = require('../controllers/recordController')
const router = new Router

router.post('/',recordController.create)
router.get('/', recordController.getAll)
router.put('/', recordController.update)
router.delete('/', recordController.delete)

module.exports = router
const Router = require('express')
const router = new Router
const userRouter = require('./userRouter')
const accountRouter = require('./accountRouter')
const accountTypeRouter = require('./accountTypeRouter')
const categoryRouter = require('./categoryRouter')
const recordRouter = require('./recordRouter')

router.use('/user', userRouter)
router.use('/account', accountRouter)
router.use('/accountType', accountTypeRouter )
router.use('/category', categoryRouter)
router.use('/record', recordRouter)

module.exports = router
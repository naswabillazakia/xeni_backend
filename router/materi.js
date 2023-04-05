const materiController = require('../controllers/materiController')
const { verifyToken } = require('../middleware/jwt_auth')
const router = require('express').Router()

router.get('/', verifyToken, materiController.getMateri),
router.get('/:id', verifyToken, materiController.getMateriById),
router.post('/', verifyToken, materiController.createMateri),
router.put('/:id', verifyToken, materiController.updateMateri),
router.post('/subbab', verifyToken, materiController.createSubab),
router.put('/subbab/:id', verifyToken, materiController.updateSubab),
router.delete('/:id', verifyToken, materiController.deleteMateri)

module.exports = router

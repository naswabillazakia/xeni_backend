const materiController = require('../controllers/materiController')
const router = require('express').Router()
const verifyJWT = require('../middleware/jwt_auth')

router.get('/', verifyJWT , materiController.getMateri),
router.get('/:id', verifyJWT, materiController.getMateriById),
router.post('/', verifyJWT, materiController.createMateri),
router.put('/:id', verifyJWT, materiController.updateMateri),
router.post('/subbab', verifyJWT, materiController.createSubab),
router.put('/subbab/:id', verifyJWT, materiController.updateSubab),
router.delete('/:id', verifyJWT, materiController.deleteMateri)

module.exports = router

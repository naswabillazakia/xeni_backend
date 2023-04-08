const materiController = require('../controllers/materiController')
const router = require('express').Router()
const verifyJWT = require('../middleware/jwt_auth')

router.get('/', materiController.getMateri),
router.get('/:id', materiController.getMateriById),
router.post('/', materiController.createMateri),
router.put('/:id', materiController.updateMateri),
router.post('/subbab', materiController.createSubab),
router.put('/subbab/:id', materiController.updateSubab),
router.delete('/:id', materiController.deleteMateri)

module.exports = router

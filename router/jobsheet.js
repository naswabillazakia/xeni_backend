const jobsheet = require('../controllers/jobsheetController');
const router = require('express').Router();
const verifyJWT = require('../middleware/jwt_auth');

router.post('/One', verifyJWT, jobsheet.submitOne);
router.post('/Many',verifyJWT, jobsheet.submitMany);

module.exports = router

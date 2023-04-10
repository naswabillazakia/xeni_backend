const jobsheet = require('../controllers/jobsheetController');
const router = require('express').Router();
const verifyJWT = require('../middleware/jwt_auth');

router.post('/One', jobsheet.submitOne);
router.post('/Many', jobsheet.submitMany);

module.exports = router

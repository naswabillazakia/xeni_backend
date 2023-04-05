const authController = require("../controllers/authController");
const router = require("express").Router();
const verifyJWT = require("../middleware/jwt_auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/", verifyJWT, authController.me);
router.get("/logout", verifyJWT, authController.logout);

module.exports = router;
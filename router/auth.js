const authController = require("../controllers/authController");
const router = require("express").Router();
const { verifyToken } = require("../middleware/jwt_auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", verifyToken, authController.me);
router.post("/logout", verifyToken, authController.logout);

module.exports = router;